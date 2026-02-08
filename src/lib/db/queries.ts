import { Hospital, ProcedureCode, ProcedurePrice } from '@/lib/db/schema';
import { executeQuery, executeQuerySingle } from '@/lib/db/utils';
import { getStateFromZip, getZipPrefix } from '@/lib/zip-lookup';
import { D1Database } from '@cloudflare/workers-types';

export async function searchHospitals(
  db: D1Database,
  query: string,
  state?: string,
  zipCode?: string,
  limit: number = 20
): Promise<Hospital[]> {
  const params: (string | number)[] = [];
  const conditions: string[] = [];

  if (query) {
    conditions.push('(legal_name LIKE ? OR common_name LIKE ?)');
    params.push(`%${query}%`, `%${query}%`);
  }

  if (state) {
    conditions.push('state = ?');
    params.push(state);
  } else if (zipCode) {
    const derivedState = getStateFromZip(zipCode);
    if (derivedState) {
      conditions.push('state = ?');
      params.push(derivedState);
    }
  }

  const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';
  const sql = `SELECT * FROM hospitals ${whereClause} ORDER BY legal_name LIMIT ?`;
  params.push(limit);

  return executeQuery<Hospital>(db, sql, params);
}

export async function getHospitalById(
  db: D1Database,
  hospitalId: string
): Promise<Hospital | null> {
  return executeQuerySingle<Hospital>(
    db,
    'SELECT * FROM hospitals WHERE hospital_id = ?',
    [hospitalId]
  );
}

export async function searchProcedures(
  db: D1Database,
  query: string,
  codeType?: string,
  limit: number = 20
): Promise<ProcedureCode[]> {
  const params: (string | number)[] = [];
  const conditions: string[] = [];

  if (query) {
    conditions.push('(code_id LIKE ? OR description LIKE ?)');
    params.push(`%${query}%`, `%${query}%`);
  }

  if (codeType) {
    conditions.push('code_type = ?');
    params.push(codeType);
  }

  const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';
  const sql = `SELECT * FROM procedure_codes ${whereClause} ORDER BY code_id LIMIT ?`;
  params.push(limit);

  return executeQuery<ProcedureCode>(db, sql, params);
}

export async function getProcedureByCode(
  db: D1Database,
  codeId: string
): Promise<ProcedureCode | null> {
  return executeQuerySingle<ProcedureCode>(
    db,
    'SELECT * FROM procedure_codes WHERE code_id = ?',
    [codeId]
  );
}

export async function getProcedurePrices(
  db: D1Database,
  codeId: string,
  zipCode?: string,
  _radius: number = 50,
  limit: number = 20
): Promise<(ProcedurePrice & { hospital_name: string; city: string; state: string; zip_code: string })[]> {
  const params: (string | number)[] = [codeId];
  const conditions: string[] = ['pp.code_id = ?'];

  if (zipCode) {
    const zipPrefix = getZipPrefix(zipCode);
    conditions.push('h.zip_code LIKE ?');
    params.push(`${zipPrefix}%`);
  }

  const sql = `
    SELECT pp.*, h.legal_name AS hospital_name, h.city, h.state, h.zip_code
    FROM procedure_prices pp
    JOIN hospitals h ON pp.hospital_id = h.hospital_id
    WHERE ${conditions.join(' AND ')}
    ORDER BY pp.discounted_cash_price ASC
    LIMIT ?
  `;
  params.push(limit);

  return executeQuery(db, sql, params);
}

export async function getHospitalProcedurePrices(
  db: D1Database,
  hospitalId: string,
  limit: number = 50
): Promise<(ProcedurePrice & { procedure_name: string; code_type: string; category: string })[]> {
  const sql = `
    SELECT pp.*, pc.description AS procedure_name, pc.code_type, pc.category
    FROM procedure_prices pp
    JOIN procedure_codes pc ON pp.code_id = pc.code_id
    WHERE pp.hospital_id = ?
    ORDER BY pc.category, pp.code_id
    LIMIT ?
  `;

  return executeQuery(db, sql, [hospitalId, limit]);
}

export async function compareProcedurePrices(
  db: D1Database,
  codeId: string,
  hospitalIds: string[]
): Promise<(ProcedurePrice & { hospital_name: string; city: string; state: string })[]> {
  if (!hospitalIds.length) return [];

  const placeholders = hospitalIds.map(() => '?').join(',');
  const sql = `
    SELECT pp.*, h.legal_name AS hospital_name, h.city, h.state
    FROM procedure_prices pp
    JOIN hospitals h ON pp.hospital_id = h.hospital_id
    WHERE pp.code_id = ? AND pp.hospital_id IN (${placeholders})
    ORDER BY pp.discounted_cash_price ASC
  `;

  return executeQuery(db, sql, [codeId, ...hospitalIds]);
}

export interface PriceSummary {
  min_cash_price: number | null;
  max_cash_price: number | null;
  avg_cash_price: number | null;
  min_gross_charge: number | null;
  max_gross_charge: number | null;
  hospital_count: number;
}

export async function getProcedurePriceSummary(
  db: D1Database,
  codeId: string,
  zipCode?: string
): Promise<PriceSummary | null> {
  const params: (string | number)[] = [codeId];
  const conditions: string[] = ['pp.code_id = ?'];

  if (zipCode) {
    const zipPrefix = getZipPrefix(zipCode);
    conditions.push('h.zip_code LIKE ?');
    params.push(`${zipPrefix}%`);
  }

  const sql = `
    SELECT
      MIN(pp.discounted_cash_price) AS min_cash_price,
      MAX(pp.discounted_cash_price) AS max_cash_price,
      ROUND(AVG(pp.discounted_cash_price), 2) AS avg_cash_price,
      MIN(pp.gross_charge) AS min_gross_charge,
      MAX(pp.gross_charge) AS max_gross_charge,
      COUNT(DISTINCT pp.hospital_id) AS hospital_count
    FROM procedure_prices pp
    JOIN hospitals h ON pp.hospital_id = h.hospital_id
    WHERE ${conditions.join(' AND ')}
      AND pp.discounted_cash_price IS NOT NULL
  `;

  return executeQuerySingle<PriceSummary>(db, sql, params);
}

export async function getPopularProcedures(
  db: D1Database,
  limit: number = 6
): Promise<(ProcedureCode & { hospital_count: number; avg_cash_price: number })[]> {
  const sql = `
    SELECT pc.*,
      COUNT(DISTINCT pp.hospital_id) AS hospital_count,
      ROUND(AVG(pp.discounted_cash_price), 2) AS avg_cash_price
    FROM procedure_codes pc
    JOIN procedure_prices pp ON pc.code_id = pp.code_id
    WHERE pp.discounted_cash_price IS NOT NULL
    GROUP BY pc.code_id
    ORDER BY hospital_count DESC
    LIMIT ?
  `;

  return executeQuery(db, sql, [limit]);
}

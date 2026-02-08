import { D1Database } from '@cloudflare/workers-types';

interface ImportResult {
  success: boolean;
  count: number;
  errors: string[];
}

function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      if (inQuotes && i + 1 < line.length && line[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  result.push(current.trim());
  return result;
}

export async function importHospitalsFromCSV(
  db: D1Database,
  csvData: string
): Promise<ImportResult> {
  const lines = csvData.trim().split('\n');
  if (lines.length < 2) {
    return { success: false, count: 0, errors: ['CSV must have a header row and at least one data row'] };
  }

  const headers = parseCSVLine(lines[0]).map(h => h.toLowerCase().trim());
  for (const req of ['hospital_id', 'legal_name']) {
    if (!headers.includes(req)) {
      return { success: false, count: 0, errors: [`Missing required header: ${req}`] };
    }
  }

  let successCount = 0;
  const errors: string[] = [];
  const statements: D1PreparedStatement[] = [];

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    const values = parseCSVLine(line);
    if (values.length !== headers.length) {
      errors.push(`Line ${i + 1}: Column count (${values.length}) doesn't match header count (${headers.length})`);
      continue;
    }

    const row: Record<string, string> = {};
    headers.forEach((h, idx) => { row[h] = values[idx]; });

    if (!row.hospital_id || !row.legal_name) {
      errors.push(`Line ${i + 1}: Missing required fields (hospital_id or legal_name)`);
      continue;
    }

    statements.push(
      db.prepare(
        `INSERT OR REPLACE INTO hospitals (hospital_id, legal_name, common_name, address, city, state, zip_code, latitude, longitude, website_url, phone)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
      ).bind(
        row.hospital_id,
        row.legal_name,
        row.common_name || null,
        row.address || null,
        row.city || null,
        row.state || null,
        row.zip_code || null,
        row.latitude ? parseFloat(row.latitude) : null,
        row.longitude ? parseFloat(row.longitude) : null,
        row.website_url || null,
        row.phone || null
      )
    );
    successCount++;
  }

  if (statements.length > 0) {
    try {
      await db.batch(statements);
    } catch (error) {
      return { success: false, count: 0, errors: [`Batch insert failed: ${error}`] };
    }
  }

  return { success: successCount > 0, count: successCount, errors };
}

export async function importProcedureCodesFromCSV(
  db: D1Database,
  csvData: string
): Promise<ImportResult> {
  const lines = csvData.trim().split('\n');
  if (lines.length < 2) {
    return { success: false, count: 0, errors: ['CSV must have a header row and at least one data row'] };
  }

  const headers = parseCSVLine(lines[0]).map(h => h.toLowerCase().trim());
  for (const req of ['code_id', 'code_type', 'description']) {
    if (!headers.includes(req)) {
      return { success: false, count: 0, errors: [`Missing required header: ${req}`] };
    }
  }

  let successCount = 0;
  const errors: string[] = [];
  const statements: D1PreparedStatement[] = [];

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    const values = parseCSVLine(line);
    if (values.length !== headers.length) {
      errors.push(`Line ${i + 1}: Column count mismatch`);
      continue;
    }

    const row: Record<string, string> = {};
    headers.forEach((h, idx) => { row[h] = values[idx]; });

    if (!row.code_id || !row.code_type || !row.description) {
      errors.push(`Line ${i + 1}: Missing required fields`);
      continue;
    }

    statements.push(
      db.prepare(
        `INSERT OR REPLACE INTO procedure_codes (code_id, code_type, description, category, subcategory)
         VALUES (?, ?, ?, ?, ?)`
      ).bind(row.code_id, row.code_type, row.description, row.category || null, row.subcategory || null)
    );
    successCount++;
  }

  if (statements.length > 0) {
    try {
      await db.batch(statements);
    } catch (error) {
      return { success: false, count: 0, errors: [`Batch insert failed: ${error}`] };
    }
  }

  return { success: successCount > 0, count: successCount, errors };
}

export async function importProcedurePricesFromCSV(
  db: D1Database,
  csvData: string
): Promise<ImportResult> {
  const lines = csvData.trim().split('\n');
  if (lines.length < 2) {
    return { success: false, count: 0, errors: ['CSV must have a header row and at least one data row'] };
  }

  const headers = parseCSVLine(lines[0]).map(h => h.toLowerCase().trim());
  for (const req of ['hospital_id', 'code_id']) {
    if (!headers.includes(req)) {
      return { success: false, count: 0, errors: [`Missing required header: ${req}`] };
    }
  }

  let successCount = 0;
  const errors: string[] = [];
  const statements: D1PreparedStatement[] = [];

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    const values = parseCSVLine(line);
    if (values.length !== headers.length) {
      errors.push(`Line ${i + 1}: Column count mismatch`);
      continue;
    }

    const row: Record<string, string> = {};
    headers.forEach((h, idx) => { row[h] = values[idx]; });

    if (!row.hospital_id || !row.code_id) {
      errors.push(`Line ${i + 1}: Missing required fields`);
      continue;
    }

    const grossCharge = row.gross_charge ? parseFloat(row.gross_charge) : null;
    const cashPrice = row.discounted_cash_price ? parseFloat(row.discounted_cash_price) : null;
    const minNeg = row.min_negotiated_charge ? parseFloat(row.min_negotiated_charge) : null;
    const maxNeg = row.max_negotiated_charge ? parseFloat(row.max_negotiated_charge) : null;

    if ([grossCharge, cashPrice, minNeg, maxNeg].some(v => v !== null && isNaN(v))) {
      errors.push(`Line ${i + 1}: Invalid numeric value in price fields`);
      continue;
    }

    statements.push(
      db.prepare(
        `INSERT OR REPLACE INTO procedure_prices (hospital_id, code_id, setting, gross_charge, discounted_cash_price, min_negotiated_charge, max_negotiated_charge)
         VALUES (?, ?, ?, ?, ?, ?, ?)`
      ).bind(row.hospital_id, row.code_id, row.setting || null, grossCharge, cashPrice, minNeg, maxNeg)
    );
    successCount++;
  }

  if (statements.length > 0) {
    try {
      const BATCH_SIZE = 100;
      for (let i = 0; i < statements.length; i += BATCH_SIZE) {
        await db.batch(statements.slice(i, i + BATCH_SIZE));
      }
    } catch (error) {
      return { success: false, count: 0, errors: [`Batch insert failed: ${error}`] };
    }
  }

  return { success: successCount > 0, count: successCount, errors };
}

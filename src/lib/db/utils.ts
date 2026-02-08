// Database utility functions for D1 database

import { D1Database } from '@cloudflare/workers-types';

/**
 * Execute a SQL query with parameters
 */
export async function executeQuery<T = any>(
  db: D1Database,
  query: string,
  params?: any[]
): Promise<T[]> {
  const result = await db.prepare(query).bind(...(params || [])).all();
  return result.results as T[];
}

/**
 * Execute a SQL query and return a single row
 */
export async function executeQuerySingle<T = any>(
  db: D1Database,
  query: string,
  params?: any[]
): Promise<T | null> {
  const result = await db.prepare(query).bind(...(params || [])).first();
  return result as T | null;
}

/**
 * Execute a SQL query that doesn't return data (INSERT, UPDATE, DELETE)
 */
export async function executeStatement(
  db: D1Database,
  query: string,
  params?: any[]
): Promise<{ success: boolean; meta: any }> {
  try {
    const result = await db.prepare(query).bind(...(params || [])).run();
    return { 
      success: true, 
      meta: { 
        changes: result.meta?.changes,
        last_row_id: result.meta?.last_row_id
      } 
    };
  } catch (error) {
    console.error('Database error:', error);
    return { success: false, meta: { error } };
  }
}

/**
 * Insert a record into a table
 */
export async function insertRecord<T extends Record<string, any>>(
  db: D1Database,
  table: string,
  data: T
): Promise<number | null> {
  const keys = Object.keys(data);
  const values = Object.values(data);
  const placeholders = keys.map(() => '?').join(', ');
  
  const query = `INSERT INTO ${table} (${keys.join(', ')}) VALUES (${placeholders})`;
  
  const result = await executeStatement(db, query, values);
  return result.success ? (result.meta.last_row_id as number) : null;
}

/**
 * Update a record in a table
 */
export async function updateRecord<T extends Record<string, any>>(
  db: D1Database,
  table: string,
  data: T,
  whereClause: string,
  whereParams: any[]
): Promise<boolean> {
  const keys = Object.keys(data).filter(key => data[key] !== undefined);
  const values = keys.map(key => data[key]);
  
  const setClause = keys.map(key => `${key} = ?`).join(', ');
  const query = `UPDATE ${table} SET ${setClause} WHERE ${whereClause}`;
  
  const result = await executeStatement(db, query, [...values, ...whereParams]);
  return result.success;
}

/**
 * Delete a record from a table
 */
export async function deleteRecord(
  db: D1Database,
  table: string,
  whereClause: string,
  whereParams: any[]
): Promise<boolean> {
  const query = `DELETE FROM ${table} WHERE ${whereClause}`;
  const result = await executeStatement(db, query, whereParams);
  return result.success;
}

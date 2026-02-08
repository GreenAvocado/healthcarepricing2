import { describe, it, expect } from 'vitest';
import {
  searchProceduresSchema,
  searchHospitalsSchema,
  getPricesSchema,
  comparePricesSchema,
  hospitalPricesSchema,
  importSchema,
  validateImportFile,
  parseSearchParams,
} from './validation';

describe('searchProceduresSchema', () => {
  it('accepts valid input', () => {
    const result = searchProceduresSchema.safeParse({ query: 'knee', limit: 10 });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.query).toBe('knee');
      expect(result.data.limit).toBe(10);
    }
  });

  it('applies defaults', () => {
    const result = searchProceduresSchema.safeParse({});
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.query).toBe('');
      expect(result.data.limit).toBe(20);
    }
  });

  it('rejects query over 200 chars', () => {
    const result = searchProceduresSchema.safeParse({ query: 'a'.repeat(201) });
    expect(result.success).toBe(false);
  });

  it('coerces string limit to number', () => {
    const result = searchProceduresSchema.safeParse({ limit: '5' });
    expect(result.success).toBe(true);
    if (result.success) expect(result.data.limit).toBe(5);
  });

  it('rejects limit > 100', () => {
    const result = searchProceduresSchema.safeParse({ limit: 200 });
    expect(result.success).toBe(false);
  });
});

describe('searchHospitalsSchema', () => {
  it('accepts valid ZIP code', () => {
    const result = searchHospitalsSchema.safeParse({ zip_code: '10001' });
    expect(result.success).toBe(true);
  });

  it('rejects invalid ZIP code', () => {
    const result = searchHospitalsSchema.safeParse({ zip_code: '1234' });
    expect(result.success).toBe(false);
  });

  it('rejects non-numeric ZIP', () => {
    const result = searchHospitalsSchema.safeParse({ zip_code: 'abcde' });
    expect(result.success).toBe(false);
  });
});

describe('getPricesSchema', () => {
  it('requires code_id', () => {
    const result = getPricesSchema.safeParse({});
    expect(result.success).toBe(false);
  });

  it('accepts valid input', () => {
    const result = getPricesSchema.safeParse({ code_id: 'CPT-99213', zip_code: '10001' });
    expect(result.success).toBe(true);
  });
});

describe('comparePricesSchema', () => {
  it('requires at least one hospital_id', () => {
    const result = comparePricesSchema.safeParse({ code_id: 'CPT-99213', hospital_id: [] });
    expect(result.success).toBe(false);
  });

  it('accepts valid input', () => {
    const result = comparePricesSchema.safeParse({
      code_id: 'CPT-99213',
      hospital_id: ['H001', 'H002'],
    });
    expect(result.success).toBe(true);
  });

  it('rejects more than 10 hospitals', () => {
    const ids = Array.from({ length: 11 }, (_, i) => `H${i}`);
    const result = comparePricesSchema.safeParse({ code_id: 'CPT-99213', hospital_id: ids });
    expect(result.success).toBe(false);
  });
});

describe('hospitalPricesSchema', () => {
  it('requires hospital_id', () => {
    const result = hospitalPricesSchema.safeParse({});
    expect(result.success).toBe(false);
  });

  it('defaults limit to 50', () => {
    const result = hospitalPricesSchema.safeParse({ hospital_id: 'H001' });
    expect(result.success).toBe(true);
    if (result.success) expect(result.data.limit).toBe(50);
  });
});

describe('importSchema', () => {
  it('accepts valid types', () => {
    expect(importSchema.safeParse({ type: 'hospitals' }).success).toBe(true);
    expect(importSchema.safeParse({ type: 'procedures' }).success).toBe(true);
    expect(importSchema.safeParse({ type: 'prices' }).success).toBe(true);
  });

  it('rejects invalid type', () => {
    expect(importSchema.safeParse({ type: 'users' }).success).toBe(false);
  });
});

describe('validateImportFile', () => {
  it('accepts valid CSV file', () => {
    const file = new File(['a,b,c'], 'test.csv', { type: 'text/csv' });
    expect(validateImportFile(file)).toEqual({ valid: true });
  });

  it('rejects non-CSV file', () => {
    const file = new File(['data'], 'test.json', { type: 'application/json' });
    const result = validateImportFile(file);
    expect(result.valid).toBe(false);
    expect(result.error).toContain('CSV');
  });

  it('rejects oversized file', () => {
    const bigContent = 'x'.repeat(11 * 1024 * 1024);
    const file = new File([bigContent], 'big.csv', { type: 'text/csv' });
    const result = validateImportFile(file);
    expect(result.valid).toBe(false);
    expect(result.error).toContain('large');
  });
});

describe('parseSearchParams', () => {
  it('parses valid params', () => {
    const params = new URLSearchParams('query=knee&limit=5');
    const result = parseSearchParams(params, searchProceduresSchema);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.query).toBe('knee');
      expect(result.data.limit).toBe(5);
    }
  });

  it('returns error for invalid params', () => {
    const params = new URLSearchParams('limit=-1');
    const result = parseSearchParams(params, searchProceduresSchema);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error).toBeTruthy();
    }
  });

  it('handles multiple values for same key', () => {
    const params = new URLSearchParams('code_id=CPT-99213&hospital_id=H001&hospital_id=H002');
    const result = parseSearchParams(params, comparePricesSchema);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.hospital_id).toEqual(['H001', 'H002']);
    }
  });
});

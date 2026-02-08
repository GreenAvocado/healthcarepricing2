import { z } from 'zod';

export const searchProceduresSchema = z.object({
  query: z.string().max(200).default(''),
  type: z.string().max(20).optional(),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});

export const searchHospitalsSchema = z.object({
  query: z.string().max(200).default(''),
  state: z.string().max(2).optional(),
  zip_code: z.string().regex(/^\d{5}$/, 'ZIP code must be 5 digits').optional(),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});

export const getPricesSchema = z.object({
  code_id: z.string().min(1, 'Procedure code is required').max(20),
  zip_code: z.string().regex(/^\d{5}$/).optional(),
  radius: z.coerce.number().int().min(1).max(500).default(50),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});

export const comparePricesSchema = z.object({
  code_id: z.string().min(1, 'Procedure code is required').max(20),
  hospital_id: z.array(z.string().max(20)).min(1, 'At least one hospital ID is required').max(10),
});

export const hospitalPricesSchema = z.object({
  hospital_id: z.string().min(1, 'Hospital ID is required').max(20),
  limit: z.coerce.number().int().min(1).max(200).default(50),
});

export const importSchema = z.object({
  type: z.enum(['hospitals', 'procedures', 'prices'], {
    errorMap: () => ({ message: 'Type must be one of: hospitals, procedures, prices' }),
  }),
});

const MAX_IMPORT_SIZE = 10 * 1024 * 1024; // 10 MB

export function validateImportFile(file: File): { valid: boolean; error?: string } {
  if (file.size > MAX_IMPORT_SIZE) {
    return { valid: false, error: `File too large. Maximum size is ${MAX_IMPORT_SIZE / 1024 / 1024}MB.` };
  }
  if (!file.name.endsWith('.csv')) {
    return { valid: false, error: 'Only CSV files are accepted.' };
  }
  return { valid: true };
}

export function parseSearchParams(
  searchParams: URLSearchParams,
  schema: z.ZodSchema
): { success: true; data: z.infer<typeof schema> } | { success: false; error: string } {
  const raw: Record<string, string | string[]> = {};
  for (const [key, value] of searchParams.entries()) {
    if (raw[key]) {
      // Multiple values for same key — make it an array
      if (Array.isArray(raw[key])) {
        (raw[key] as string[]).push(value);
      } else {
        raw[key] = [raw[key] as string, value];
      }
    } else {
      raw[key] = value;
    }
  }

  const result = schema.safeParse(raw);
  if (!result.success) {
    const firstError = result.error.issues[0];
    return { success: false, error: `${firstError.path.join('.')}: ${firstError.message}` };
  }
  return { success: true, data: result.data };
}

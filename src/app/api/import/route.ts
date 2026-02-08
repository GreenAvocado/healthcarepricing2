import { NextRequest } from 'next/server';
import { importHospitalsFromCSV, importProcedureCodesFromCSV, importProcedurePricesFromCSV } from '@/lib/db/import';
import { importSchema, validateImportFile } from '@/lib/validation';
import { successResponse, errorResponse, validateImportAuth } from '@/lib/api-utils';

export const runtime = 'edge';

export async function POST(request: NextRequest) {
  if (!validateImportAuth(request)) {
    return errorResponse('Unauthorized. Provide a valid X-Import-Key header.', 401);
  }

  try {
    const formData = await request.formData();
    const rawType = formData.get('type') as string;
    const file = formData.get('file') as File;

    if (!file) {
      return errorResponse('File is required', 400);
    }

    const typeResult = importSchema.safeParse({ type: rawType });
    if (!typeResult.success) {
      return errorResponse(typeResult.error.issues[0].message, 400);
    }

    const fileValidation = validateImportFile(file);
    if (!fileValidation.valid) {
      return errorResponse(fileValidation.error!, 400);
    }

    const csvData = await file.text();
    const fileType = typeResult.data.type;

    // @ts-expect-error - DB is injected by Cloudflare Workers
    const db = DB;
    let result;

    switch (fileType) {
      case 'hospitals':
        result = await importHospitalsFromCSV(db, csvData);
        break;
      case 'procedures':
        result = await importProcedureCodesFromCSV(db, csvData);
        break;
      case 'prices':
        result = await importProcedurePricesFromCSV(db, csvData);
        break;
    }

    return successResponse({
      count: result.count,
      errors: result.errors.length > 0 ? result.errors.slice(0, 50) : undefined,
    });
  } catch (error) {
    console.error('Error importing data:', error);
    return errorResponse('Failed to import data');
  }
}

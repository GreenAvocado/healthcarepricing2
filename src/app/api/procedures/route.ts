import { NextRequest } from 'next/server';
import { searchProcedures } from '@/lib/db/queries';
import { searchProceduresSchema, parseSearchParams } from '@/lib/validation';
import { successResponse, errorResponse } from '@/lib/api-utils';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  const parsed = parseSearchParams(request.nextUrl.searchParams, searchProceduresSchema);
  if (!parsed.success) {
    return errorResponse(parsed.error, 400);
  }

  const { query, type, limit } = parsed.data;

  try {
    // @ts-expect-error - DB is injected by Cloudflare Workers
    const procedures = await searchProcedures(DB, query, type, limit);
    return successResponse(procedures);
  } catch (error) {
    console.error('Error searching procedures:', error);
    return errorResponse('Failed to search procedures');
  }
}

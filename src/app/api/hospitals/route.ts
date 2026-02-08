import { NextRequest } from 'next/server';
import { searchHospitals } from '@/lib/db/queries';
import { searchHospitalsSchema, parseSearchParams } from '@/lib/validation';
import { successResponse, errorResponse } from '@/lib/api-utils';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  const parsed = parseSearchParams(request.nextUrl.searchParams, searchHospitalsSchema);
  if (!parsed.success) {
    return errorResponse(parsed.error, 400);
  }

  const { query, state, zip_code, limit } = parsed.data;

  try {
    // @ts-expect-error - DB is injected by Cloudflare Workers
    const hospitals = await searchHospitals(DB, query, state, zip_code, limit);
    return successResponse(hospitals);
  } catch (error) {
    console.error('Error searching hospitals:', error);
    return errorResponse('Failed to search hospitals');
  }
}

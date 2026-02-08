import { NextRequest } from 'next/server';
import { compareProcedurePrices } from '@/lib/db/queries';
import { comparePricesSchema, parseSearchParams } from '@/lib/validation';
import { successResponse, errorResponse } from '@/lib/api-utils';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  const parsed = parseSearchParams(request.nextUrl.searchParams, comparePricesSchema);
  if (!parsed.success) {
    return errorResponse(parsed.error, 400);
  }

  const { code_id, hospital_id } = parsed.data;

  try {
    // @ts-expect-error - DB is injected by Cloudflare Workers
    const comparisonData = await compareProcedurePrices(DB, code_id, hospital_id);
    return successResponse(comparisonData);
  } catch (error) {
    console.error('Error comparing procedure prices:', error);
    return errorResponse('Failed to compare procedure prices');
  }
}

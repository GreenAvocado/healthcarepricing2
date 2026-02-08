import { NextRequest } from 'next/server';
import { getHospitalProcedurePrices } from '@/lib/db/queries';
import { hospitalPricesSchema, parseSearchParams } from '@/lib/validation';
import { successResponse, errorResponse } from '@/lib/api-utils';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  const parsed = parseSearchParams(request.nextUrl.searchParams, hospitalPricesSchema);
  if (!parsed.success) {
    return errorResponse(parsed.error, 400);
  }

  const { hospital_id, limit } = parsed.data;

  try {
    // @ts-expect-error - DB is injected by Cloudflare Workers
    const prices = await getHospitalProcedurePrices(DB, hospital_id, limit);
    return successResponse(prices);
  } catch (error) {
    console.error('Error getting hospital procedure prices:', error);
    return errorResponse('Failed to get hospital procedure prices');
  }
}

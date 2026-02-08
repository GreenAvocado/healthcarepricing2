import { NextRequest } from 'next/server';
import { getProcedurePrices } from '@/lib/db/queries';
import { getPricesSchema, parseSearchParams } from '@/lib/validation';
import { successResponse, errorResponse } from '@/lib/api-utils';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  const parsed = parseSearchParams(request.nextUrl.searchParams, getPricesSchema);
  if (!parsed.success) {
    return errorResponse(parsed.error, 400);
  }

  const { code_id, zip_code, radius, limit } = parsed.data;

  try {
    // @ts-expect-error - DB is injected by Cloudflare Workers
    const prices = await getProcedurePrices(DB, code_id, zip_code, radius, limit);
    return successResponse(prices);
  } catch (error) {
    console.error('Error getting procedure prices:', error);
    return errorResponse('Failed to get procedure prices');
  }
}

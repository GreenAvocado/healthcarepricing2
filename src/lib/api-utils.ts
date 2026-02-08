import { NextRequest } from 'next/server';

const SECURITY_HEADERS = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
};

export function jsonResponse(data: unknown, status: number = 200): Response {
  return Response.json(data, {
    status,
    headers: SECURITY_HEADERS,
  });
}

export function errorResponse(message: string, status: number = 500): Response {
  return jsonResponse({ success: false, error: message }, status);
}

export function successResponse(data: unknown): Response {
  return jsonResponse({ success: true, data });
}

const IMPORT_API_KEY_HEADER = 'X-Import-Key';

export function validateImportAuth(request: NextRequest): boolean {
  // In production, set IMPORT_API_KEY as a Cloudflare Worker secret.
  // For now, require any non-empty key to be present.
  const key = request.headers.get(IMPORT_API_KEY_HEADER);
  if (!key) return false;

  // @ts-expect-error - IMPORT_API_KEY is set as a Cloudflare secret
  const expectedKey = typeof IMPORT_API_KEY !== 'undefined' ? IMPORT_API_KEY : undefined;
  if (!expectedKey) {
    // If no key is configured, accept any key (development mode)
    return true;
  }
  return key === expectedKey;
}

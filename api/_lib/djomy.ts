import { createHmac, timingSafeEqual } from 'crypto';

// Djomy payment aggregator client (Guinea/Sierra Leone/Liberia mobile money + cards).
// Auth model: every request needs a Bearer token (from POST /v1/auth) AND a
// recomputed `X-API-KEY: clientId:HMAC-SHA256(clientId, clientSecret)` header.
// Docs: https://developers.djomy.africa/

function getConfig() {
  const clientId = process.env.DJOMY_CLIENT_ID;
  const clientSecret = process.env.DJOMY_CLIENT_SECRET;
  const baseUrl = process.env.DJOMY_API_BASE_URL;
  const partnerDomainKey = process.env.DJOMY_PARTNER_DOMAIN_KEY;
  if (!clientId || !clientSecret || !baseUrl || !partnerDomainKey) {
    throw new Error(
      'DJOMY_CLIENT_ID, DJOMY_CLIENT_SECRET, DJOMY_API_BASE_URL and DJOMY_PARTNER_DOMAIN_KEY must be set'
    );
  }
  return { clientId, clientSecret, baseUrl: baseUrl.replace(/\/+$/, ''), partnerDomainKey };
}

function apiKeyHeader(clientId: string, clientSecret: string): string {
  const hmac = createHmac('sha256', clientSecret).update(clientId).digest('hex');
  return `${clientId}:${hmac}`;
}

async function getAccessToken(): Promise<{
  token: string;
  clientId: string;
  clientSecret: string;
  baseUrl: string;
  partnerDomainKey: string;
}> {
  const { clientId, clientSecret, baseUrl, partnerDomainKey } = getConfig();
  const res = await fetch(`${baseUrl}/v1/auth`, {
    method: 'POST',
    headers: {
      'X-API-KEY': apiKeyHeader(clientId, clientSecret),
      'X-PARTNER-DOMAIN': partnerDomainKey,
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'User-Agent': 'Mozilla/5.0 (compatible; KoyamaPlus/1.0; +https://koyamaplus.vercel.app)',
    },
  });

  if (!res.ok) {
    throw new Error(`Djomy auth failed: ${res.status} ${await res.text()}`);
  }

  const body: any = await res.json();
  const token =
    body.token ?? body.accessToken ?? body.access_token ?? body.data?.token ?? body.data?.accessToken;
  if (!token) {
    throw new Error(`Djomy auth response missing token: ${JSON.stringify(body)}`);
  }

  return { token, clientId, clientSecret, baseUrl, partnerDomainKey };
}

async function authedFetch(path: string, init: RequestInit = {}) {
  const { token, clientId, clientSecret, baseUrl, partnerDomainKey } = await getAccessToken();

  const res = await fetch(`${baseUrl}${path}`, {
    ...init,
    headers: {
      ...init.headers,
      Authorization: `Bearer ${token}`,
      'X-API-KEY': apiKeyHeader(clientId, clientSecret),
      'X-PARTNER-DOMAIN': partnerDomainKey,
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'User-Agent': 'Mozilla/5.0 (compatible; KoyamaPlus/1.0; +https://koyamaplus.vercel.app)',
    },
  });

  const text = await res.text();

  if (!res.ok) {
    throw new Error(`Djomy request to ${path} failed: ${res.status} ${text}`);
  }

  const body = text ? JSON.parse(text) : {};

  return body;
}

export interface CreatePaymentGatewayParams {
  amount: number;
  currency: 'GNF' | 'FCFA' | 'Dollar' | 'Leones';
  payerNumber: string;
  description: string;
  allowedPaymentMethods: Array<'OM' | 'MOMO'>;
  returnUrl: string;
}

export interface CreatePaymentGatewayResult {
  redirectUrl: string;
  transactionId: string;
  raw: unknown;
}

export async function createPaymentGateway(
  params: CreatePaymentGatewayParams
): Promise<CreatePaymentGatewayResult> {
  const body: any = await authedFetch('/v1/payment-gateways', {
    method: 'POST',
    body: JSON.stringify(params),
  });

  const redirectUrl = body.redirectUrl ?? body.redirect_url ?? body.data?.redirectUrl;
  const transactionId = body.transactionId ?? body.transaction_id ?? body.data?.transactionId;

  if (!redirectUrl || !transactionId) {
    throw new Error(`Djomy create-payment-gateway response missing fields: ${JSON.stringify(body)}`);
  }

  return { redirectUrl, transactionId, raw: body };
}

export interface VerifyPaymentResult {
  status: 'SUCCESS' | 'PENDING' | 'CAPTURED' | 'FAILED';
  paidAmount: number | null;
  receivedAmount: number | null;
  currency: string | null;
  raw: unknown;
}

export async function verifyPayment(transactionId: string): Promise<VerifyPaymentResult> {
  const body: any = await authedFetch(`/v1/payments/${encodeURIComponent(transactionId)}`, {
    method: 'GET',
  });

  // The wrapper's top-level `status` is an HTTP-like code (e.g. 200), not the
  // payment status — the real one lives under `data` on this API.
  const data = body.data ?? body;

  return {
    status: data.status,
    paidAmount: data.paidAmount ?? null,
    receivedAmount: data.receivedAmount ?? null,
    currency: data.currency ?? null,
    raw: body,
  };
}

/**
 * Verifies the `X-Webhook-Signature: v1:<hex>` header against the raw request
 * body. Must run BEFORE parsing the body as JSON, on the untouched bytes.
 */
export function verifyWebhookSignature(rawBody: string, signatureHeader: string | undefined): boolean {
  if (!signatureHeader || !signatureHeader.startsWith('v1:')) return false;

  const { clientSecret } = getConfig();
  const provided = signatureHeader.slice('v1:'.length);
  const expected = createHmac('sha256', clientSecret).update(rawBody).digest('hex');

  const a = Buffer.from(provided, 'hex');
  const b = Buffer.from(expected, 'hex');
  if (a.length !== b.length) return false;

  return timingSafeEqual(a, b);
}

export function extractTransactionId(payload: any): string | null {
  return (
    payload?.transactionId ??
    payload?.transaction_id ??
    payload?.data?.transactionId ??
    payload?.data?.transaction_id ??
    null
  );
}

export function extractEventType(payload: any): string | null {
  return payload?.event ?? payload?.type ?? payload?.eventType ?? null;
}

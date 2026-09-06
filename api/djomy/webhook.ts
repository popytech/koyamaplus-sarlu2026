import type { VercelRequest, VercelResponse } from '@vercel/node';
import type { IncomingMessage } from 'http';
import { sql } from '../_lib/db';
import { verifyWebhookSignature, verifyPayment, extractTransactionId, extractEventType } from '../_lib/djomy';

// Disable Vercel's automatic body parsing: signature verification needs the
// exact raw bytes Djomy signed, not a re-serialized copy of req.body.
export const config = {
  api: { bodyParser: false },
};

function readRawBody(req: IncomingMessage): Promise<string> {
  return new Promise((resolve, reject) => {
    let data = '';
    req.on('data', (chunk) => (data += chunk));
    req.on('end', () => resolve(data));
    req.on('error', reject);
  });
}

const SUCCESS_EVENTS = new Set(['payment.success']);
const FAILURE_EVENTS = new Set(['payment.failed', 'payment.cancelled']);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const rawBody = await readRawBody(req);
  const signatureValid = verifyWebhookSignature(rawBody, req.headers['x-webhook-signature'] as string | undefined);

  if (!signatureValid) {
    console.error('Djomy webhook: invalid signature, rejecting');
    return res.status(401).json({ error: 'Invalid signature' });
  }

  let payload: any;
  try {
    payload = JSON.parse(rawBody);
  } catch {
    // Signed but not valid JSON — nothing we can do with it, ack so Djomy stops retrying.
    return res.status(200).json({ received: true });
  }

  const eventType = extractEventType(payload);
  const transactionId = extractTransactionId(payload);
  const db = sql();

  let matchedOrderNumber: string | null = null;

  try {
    if (transactionId) {
      const rows = await db`
        SELECT order_number FROM orders WHERE djomy_transaction_id = ${transactionId} LIMIT 1
      `;
      matchedOrderNumber = (rows[0] as any)?.order_number ?? null;
    }

    if (matchedOrderNumber && transactionId) {
      if (SUCCESS_EVENTS.has(eventType ?? '')) {
        // Never trust the webhook event alone — re-verify server-to-server before fulfilling.
        const verified = await verifyPayment(transactionId);
        if (verified.status === 'SUCCESS') {
          await db`
            UPDATE orders SET payment_status = 'paid', status = 'processing', updated_at = now()
            WHERE order_number = ${matchedOrderNumber}
          `;
        }
      } else if (FAILURE_EVENTS.has(eventType ?? '')) {
        await db`
          UPDATE orders SET payment_status = 'failed', updated_at = now()
          WHERE order_number = ${matchedOrderNumber}
        `;
      }
    }
  } finally {
    await db`
      INSERT INTO djomy_webhook_events (event_type, transaction_id, matched_order_number, signature_valid, payload)
      VALUES (${eventType}, ${transactionId}, ${matchedOrderNumber}, ${signatureValid}, ${JSON.stringify(payload)})
    `;
  }

  return res.status(200).json({ received: true });
}

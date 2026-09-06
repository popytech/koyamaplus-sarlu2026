import type { VercelRequest, VercelResponse } from '@vercel/node';
import { sql } from '../_lib/db.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const orderNumber = req.query.order;
  if (typeof orderNumber !== 'string' || !orderNumber) {
    return res.status(400).json({ error: 'Missing order query param' });
  }

  const db = sql();
  const rows = await db`
    SELECT order_number, status, payment_status, total_amount, currency
    FROM orders
    WHERE order_number = ${orderNumber}
    LIMIT 1
  `;

  if (rows.length === 0) {
    return res.status(404).json({ error: 'Order not found' });
  }

  return res.status(200).json(rows[0]);
}

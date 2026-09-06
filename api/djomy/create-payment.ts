import type { VercelRequest, VercelResponse } from '@vercel/node';
import { sql } from '../_lib/db.js';
import { createPaymentGateway } from '../_lib/djomy.js';
// @ts-ignore - resolveJsonModule isn't configured for the api/ build; Vercel's Node runtime needs the import attribute at runtime.
import productsData from '../../src/data/products.json' with { type: 'json' };

interface CartItemInput {
  product_id: string;
  quantity: number;
}

interface RequestBody {
  paymentMethod: 'orange_money' | 'mtn_money';
  items: CartItemInput[];
  shippingAddress: {
    full_name: string;
    phone: string;
    city: string;
    address: string;
  };
  notes?: string;
}

const PAYMENT_METHOD_TO_DJOMY: Record<RequestBody['paymentMethod'], 'OM' | 'MOMO'> = {
  orange_money: 'OM',
  mtn_money: 'MOMO',
};

function computeTotal(items: CartItemInput[]): { total: number; resolvedItems: any[] } {
  const products: any[] = (productsData as any).products;
  let total = 0;
  const resolvedItems = items.map((item) => {
    const product = products.find((p) => p.id === item.product_id && p.is_active);
    if (!product) throw new Error(`Unknown or inactive product_id: ${item.product_id}`);
    if (!Number.isInteger(item.quantity) || item.quantity < 1) {
      throw new Error(`Invalid quantity for product_id: ${item.product_id}`);
    }
    const unitPrice = product.sale_price ?? product.price;
    total += unitPrice * item.quantity;
    return { product_id: product.id, name: product.name, quantity: item.quantity, unit_price: unitPrice };
  });
  return { total, resolvedItems };
}

function buildReturnUrl(req: VercelRequest, orderNumber: string): string {
  const host = req.headers['x-forwarded-host'] ?? req.headers.host;
  const proto = req.headers['x-forwarded-proto'] ?? 'https';
  return `${proto}://${host}/checkout?djomy_return=1&order=${encodeURIComponent(orderNumber)}`;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const body = req.body as RequestBody;

  if (!body?.paymentMethod || !PAYMENT_METHOD_TO_DJOMY[body.paymentMethod]) {
    return res.status(400).json({ error: 'Invalid or missing paymentMethod' });
  }
  if (!Array.isArray(body.items) || body.items.length === 0) {
    return res.status(400).json({ error: 'Cart is empty' });
  }
  const addr = body.shippingAddress;
  if (!addr?.full_name || !addr?.phone || !addr?.city || !addr?.address) {
    return res.status(400).json({ error: 'Missing shipping address fields' });
  }

  let total: number;
  let resolvedItems: any[];
  try {
    ({ total, resolvedItems } = computeTotal(body.items));
  } catch (err: any) {
    return res.status(400).json({ error: err.message });
  }

  if (total <= 0) {
    return res.status(400).json({ error: 'Order total must be greater than zero' });
  }

  const orderNumber = `KP-${Date.now()}`;
  const db = sql();

  await db`
    INSERT INTO orders (order_number, items, total_amount, currency, payment_method, shipping_address, notes)
    VALUES (${orderNumber}, ${JSON.stringify(resolvedItems)}, ${total}, 'GNF', ${body.paymentMethod}, ${JSON.stringify(addr)}, ${body.notes ?? null})
  `;

  try {
    const gateway = await createPaymentGateway({
      amount: total,
      currency: 'GNF',
      payerNumber: addr.phone.trim(),
      description: `Commande ${orderNumber} - KOYAMA PLUS`,
      allowedPaymentMethods: [PAYMENT_METHOD_TO_DJOMY[body.paymentMethod]],
      returnUrl: buildReturnUrl(req, orderNumber),
    });

    await db`
      UPDATE orders SET djomy_transaction_id = ${gateway.transactionId}, updated_at = now()
      WHERE order_number = ${orderNumber}
    `;

    return res.status(200).json({ orderNumber, redirectUrl: gateway.redirectUrl });
  } catch (err: any) {
    await db`
      UPDATE orders SET payment_status = 'failed', updated_at = now()
      WHERE order_number = ${orderNumber}
    `;
    console.error('Djomy create-payment-gateway failed', err);
    return res.status(502).json({ error: 'Payment provider error, please try again', orderNumber });
  }
}

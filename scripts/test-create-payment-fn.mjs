if (!process.env.DATABASE_URL) {
  console.error('Set DATABASE_URL env var before running this script');
  process.exit(1);
}
process.env.DJOMY_CLIENT_ID ||= 'placeholder';
process.env.DJOMY_CLIENT_SECRET ||= 'placeholder';
process.env.DJOMY_API_BASE_URL ||= 'https://example.invalid';

const mod = await import('../api/djomy/create-payment.ts');
const handler = mod.default;

const req = {
  method: 'POST',
  headers: { host: 'localhost' },
  body: {
    paymentMethod: 'orange_money',
    items: [{ product_id: 'nonexistent', quantity: 1 }],
    shippingAddress: { full_name: 'Test', phone: '22412345678', city: 'Conakry', address: 'Test' },
  },
};
const res = {
  status(code) { this._code = code; return this; },
  json(body) { console.log('STATUS', this._code, JSON.stringify(body)); return this; },
};

try {
  await handler(req, res);
} catch (err) {
  console.error('THREW:', err);
}

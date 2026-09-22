-- KOYAMA PLUS — online payment schema (Neon Postgres)
-- Only covers orders paid online via Djomy. Cash-on-delivery orders stay
-- client-side in localStorage as before (see src/lib/dataService.ts).

CREATE TABLE IF NOT EXISTS orders (
  order_number text PRIMARY KEY,
  items jsonb NOT NULL,
  total_amount numeric NOT NULL CHECK (total_amount >= 0),
  currency text NOT NULL DEFAULT 'GNF',
  status text NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending', 'processing', 'shipped', 'delivered', 'cancelled')),
  payment_method text NOT NULL CHECK (payment_method IN ('orange_money', 'mtn_money', 'card', 'kulu', 'soutra_money')),
  payment_status text NOT NULL DEFAULT 'pending'
    CHECK (payment_status IN ('pending', 'paid', 'failed', 'refunded')),
  shipping_address jsonb NOT NULL,
  notes text,
  djomy_transaction_id text UNIQUE,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_orders_djomy_transaction_id ON orders (djomy_transaction_id);

-- Raw event log for every Djomy webhook delivery, kept for debugging/audit
-- since we are not 100% certain of the payload shape until we see it live.
CREATE TABLE IF NOT EXISTS djomy_webhook_events (
  id bigserial PRIMARY KEY,
  received_at timestamptz NOT NULL DEFAULT now(),
  event_type text,
  transaction_id text,
  matched_order_number text REFERENCES orders (order_number),
  signature_valid boolean NOT NULL,
  payload jsonb NOT NULL
);

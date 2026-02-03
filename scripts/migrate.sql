-- AgoraMinds waitlist table migration
-- Run once via Neon console or psql

CREATE TABLE IF NOT EXISTS waitlist (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  type VARCHAR(50) NOT NULL CHECK (type IN ('individual','nonprofit')),
  motivation TEXT,
  referral_source VARCHAR(255),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for faster lookups
CREATE INDEX IF NOT EXISTS idx_waitlist_email ON waitlist (email);
CREATE INDEX IF NOT EXISTS idx_waitlist_created ON waitlist (created_at DESC);

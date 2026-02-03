-- AgoraMinds waitlist schema
-- Run against Neon Postgres if starting fresh

CREATE TABLE IF NOT EXISTS waitlist (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(254) UNIQUE NOT NULL,
  entity_type VARCHAR(50) NOT NULL CHECK (entity_type IN ('individual', 'nonprofit')),
  organization_name VARCHAR(255),
  contribution_type VARCHAR(255),
  message TEXT,
  referral_source VARCHAR(255),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Migration from original schema (2026-02-03):
-- ALTER TABLE waitlist DROP COLUMN IF EXISTS resource_type;
-- ALTER TABLE waitlist ALTER COLUMN name TYPE varchar(255);
-- ALTER TABLE waitlist ALTER COLUMN email TYPE varchar(254);
-- ALTER TABLE waitlist ALTER COLUMN entity_type TYPE varchar(50);
-- ALTER TABLE waitlist ADD CONSTRAINT waitlist_entity_type_check CHECK (entity_type IN ('individual', 'nonprofit'));
-- ALTER TABLE waitlist ALTER COLUMN created_at TYPE timestamptz USING created_at AT TIME ZONE 'UTC';

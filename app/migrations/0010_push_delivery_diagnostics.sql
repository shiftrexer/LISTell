CREATE TABLE IF NOT EXISTS push_delivery_diagnostics (
  user_id TEXT PRIMARY KEY,
  attempted_at INTEGER NOT NULL,
  subscription_count INTEGER NOT NULL DEFAULT 0,
  status INTEGER,
  ok INTEGER,
  endpoint_host TEXT,
  error TEXT,
  FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
);

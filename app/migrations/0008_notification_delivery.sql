CREATE TABLE IF NOT EXISTS notification_deliveries(
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  list_id TEXT REFERENCES lists(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  actor_user_id TEXT REFERENCES users(id) ON DELETE SET NULL,
  payload TEXT NOT NULL,
  created_at INTEGER NOT NULL,
  read_at INTEGER
);
CREATE INDEX IF NOT EXISTS idx_notification_deliveries_user_created ON notification_deliveries(user_id,created_at DESC);

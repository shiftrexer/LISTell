CREATE TABLE IF NOT EXISTS list_notification_settings(
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  list_id TEXT NOT NULL REFERENCES lists(id) ON DELETE CASCADE,
  product_added INTEGER NOT NULL DEFAULT 1,
  product_changed INTEGER NOT NULL DEFAULT 1,
  product_purchased INTEGER NOT NULL DEFAULT 1,
  product_restored INTEGER NOT NULL DEFAULT 1,
  product_deleted INTEGER NOT NULL DEFAULT 1,
  list_deleted INTEGER NOT NULL DEFAULT 1,
  list_renamed INTEGER NOT NULL DEFAULT 1,
  member_joined INTEGER NOT NULL DEFAULT 1,
  member_removed INTEGER NOT NULL DEFAULT 1,
  role_changed INTEGER NOT NULL DEFAULT 1,
  PRIMARY KEY(user_id,list_id)
);
CREATE TABLE IF NOT EXISTS push_subscriptions(
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  endpoint TEXT NOT NULL UNIQUE,
  p256dh TEXT NOT NULL,
  auth TEXT NOT NULL,
  created_at INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_push_subscriptions_user ON push_subscriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_events_type_created ON events(type,created_at DESC);
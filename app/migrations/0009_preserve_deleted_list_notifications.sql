PRAGMA foreign_keys=OFF;
CREATE TABLE notification_deliveries_new(
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  list_id TEXT,
  type TEXT NOT NULL,
  actor_user_id TEXT REFERENCES users(id) ON DELETE SET NULL,
  payload TEXT NOT NULL,
  created_at INTEGER NOT NULL,
  read_at INTEGER
);
INSERT INTO notification_deliveries_new(id,user_id,list_id,type,actor_user_id,payload,created_at,read_at)
SELECT id,user_id,list_id,type,actor_user_id,payload,created_at,read_at FROM notification_deliveries;
DROP TABLE notification_deliveries;
ALTER TABLE notification_deliveries_new RENAME TO notification_deliveries;
CREATE INDEX idx_notification_deliveries_user_created ON notification_deliveries(user_id,created_at DESC);
PRAGMA foreign_keys=ON;

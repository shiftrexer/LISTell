PRAGMA foreign_keys=OFF;

ALTER TABLE purchase_history RENAME TO purchase_history_old;

CREATE TABLE purchase_history(
  id TEXT PRIMARY KEY,
  item_id TEXT NOT NULL UNIQUE,
  list_id TEXT NOT NULL REFERENCES lists(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  priority TEXT NOT NULL,
  purchased_at INTEGER NOT NULL,
  purchased_by TEXT,
  purchaser_nickname TEXT NOT NULL DEFAULT ''
);

INSERT INTO purchase_history(id,item_id,list_id,name,priority,purchased_at,purchased_by,purchaser_nickname)
SELECT h.id,h.item_id,h.list_id,h.name,h.priority,h.purchased_at,h.purchased_by,COALESCE(u.nickname,'')
FROM purchase_history_old h LEFT JOIN users u ON u.id=h.purchased_by;

DROP TABLE purchase_history_old;
CREATE INDEX IF NOT EXISTS idx_history_list ON purchase_history(list_id,purchased_at DESC);

PRAGMA foreign_keys=ON;
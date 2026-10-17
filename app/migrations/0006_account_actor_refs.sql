PRAGMA foreign_keys=OFF;

CREATE TABLE lists_new(
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  created_by TEXT,
  created_at INTEGER NOT NULL
);
INSERT INTO lists_new SELECT id,name,created_by,created_at FROM lists;
DROP TABLE lists;
ALTER TABLE lists_new RENAME TO lists;

CREATE TABLE items_new(
  id TEXT PRIMARY KEY,
  list_id TEXT NOT NULL REFERENCES lists(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  priority TEXT NOT NULL CHECK(priority IN('urgent','normal','any')),
  add_order INTEGER NOT NULL,
  created_by TEXT,
  created_at INTEGER NOT NULL,
  purchased_at INTEGER,
  purchased_by TEXT
);
INSERT INTO items_new SELECT id,list_id,name,priority,add_order,created_by,created_at,purchased_at,purchased_by FROM items;
DROP TABLE items;
ALTER TABLE items_new RENAME TO items;

CREATE INDEX IF NOT EXISTS idx_items_list ON items(list_id,priority,add_order);

PRAGMA foreign_keys=ON;
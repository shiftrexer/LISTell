PRAGMA foreign_keys=ON;
CREATE TABLE IF NOT EXISTS lists(id TEXT PRIMARY KEY,name TEXT NOT NULL,created_by TEXT NOT NULL REFERENCES users(id),created_at INTEGER NOT NULL);
CREATE TABLE IF NOT EXISTS list_members(list_id TEXT NOT NULL REFERENCES lists(id) ON DELETE CASCADE,user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,role TEXT NOT NULL CHECK(role IN('admin','member','viewer')),joined_at INTEGER NOT NULL,sort_order INTEGER NOT NULL DEFAULT 0,PRIMARY KEY(list_id,user_id));
CREATE TABLE IF NOT EXISTS items(id TEXT PRIMARY KEY,list_id TEXT NOT NULL REFERENCES lists(id) ON DELETE CASCADE,name TEXT NOT NULL,priority TEXT NOT NULL CHECK(priority IN('urgent','normal','any')),add_order INTEGER NOT NULL,created_by TEXT NOT NULL REFERENCES users(id),created_at INTEGER NOT NULL,purchased_at INTEGER,purchased_by TEXT REFERENCES users(id));
CREATE TABLE IF NOT EXISTS purchase_history(id TEXT PRIMARY KEY,item_id TEXT NOT NULL UNIQUE,list_id TEXT NOT NULL REFERENCES lists(id) ON DELETE CASCADE,name TEXT NOT NULL,priority TEXT NOT NULL,purchased_at INTEGER NOT NULL,purchased_by TEXT NOT NULL REFERENCES users(id));
CREATE INDEX IF NOT EXISTS idx_members_user ON list_members(user_id,sort_order);
CREATE INDEX IF NOT EXISTS idx_items_list ON items(list_id,priority,add_order);
CREATE INDEX IF NOT EXISTS idx_history_list ON purchase_history(list_id,purchased_at DESC);
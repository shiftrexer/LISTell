CREATE TABLE IF NOT EXISTS users (id TEXT PRIMARY KEY, login_id TEXT NOT NULL UNIQUE, nickname TEXT NOT NULL, password_hash TEXT NOT NULL, password_salt TEXT NOT NULL, created_at INTEGER NOT NULL);
CREATE TABLE IF NOT EXISTS sessions (token_hash TEXT PRIMARY KEY, user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE, expires_at INTEGER NOT NULL, created_at INTEGER NOT NULL);
CREATE TABLE IF NOT EXISTS recovery_codes (code_hash TEXT PRIMARY KEY, user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE, used_at INTEGER, created_at INTEGER NOT NULL);
CREATE TABLE IF NOT EXISTS login_attempts (key TEXT PRIMARY KEY, failures INTEGER NOT NULL DEFAULT 0, blocked_until INTEGER NOT NULL DEFAULT 0, updated_at INTEGER NOT NULL);
CREATE INDEX IF NOT EXISTS idx_sessions_user ON sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_recovery_user ON recovery_codes(user_id);
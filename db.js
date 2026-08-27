'use strict';
const Database = require('better-sqlite3');
const path     = require('path');

const db = new Database(path.join(__dirname, 'cinewire.db'));

db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id         TEXT PRIMARY KEY,
    name       TEXT NOT NULL,
    email      TEXT UNIQUE NOT NULL,
    password   TEXT NOT NULL,
    avatar     TEXT DEFAULT 'U',
    created_at TEXT DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS sessions (
    token      TEXT PRIMARY KEY,
    user_id    TEXT NOT NULL,
    email      TEXT NOT NULL,
    created_at TEXT DEFAULT (datetime('now')),
    FOREIGN KEY (user_id) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS bookmarks (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    email      TEXT NOT NULL,
    article_id TEXT NOT NULL,
    created_at TEXT DEFAULT (datetime('now')),
    UNIQUE(email, article_id)
  );

  CREATE TABLE IF NOT EXISTS preferences (
    email         TEXT PRIMARY KEY,
    language      TEXT DEFAULT 'en',
    region        TEXT DEFAULT 'GL',
    categories    TEXT DEFAULT '[]',
    notifications INTEGER DEFAULT 1,
    updated_at    TEXT DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS article_reactions (
    article_id TEXT NOT NULL,
    email      TEXT NOT NULL,
    type       TEXT NOT NULL,
    created_at TEXT DEFAULT (datetime('now')),
    PRIMARY KEY (article_id, email, type)
  );

  CREATE TABLE IF NOT EXISTS comments (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    article_id TEXT NOT NULL,
    email      TEXT NOT NULL,
    name       TEXT NOT NULL,
    avatar     TEXT DEFAULT 'U',
    body       TEXT NOT NULL,
    created_at TEXT DEFAULT (datetime('now'))
  );
`);

const stmt = {
  // Users
  createUser:     db.prepare('INSERT INTO users (id,name,email,password,avatar) VALUES (?,?,?,?,?)'),
  getUserByEmail: db.prepare('SELECT * FROM users WHERE email = ?'),
  getUserById:    db.prepare('SELECT * FROM users WHERE id = ?'),

  // Sessions
  createSession: db.prepare('INSERT INTO sessions (token,user_id,email) VALUES (?,?,?)'),
  getSession:    db.prepare('SELECT * FROM sessions WHERE token = ?'),
  deleteSession: db.prepare('DELETE FROM sessions WHERE token = ?'),

  // Bookmarks
  addBookmark:    db.prepare('INSERT OR IGNORE INTO bookmarks (email,article_id) VALUES (?,?)'),
  removeBookmark: db.prepare('DELETE FROM bookmarks WHERE email=? AND article_id=?'),
  getBookmarks:   db.prepare('SELECT article_id FROM bookmarks WHERE email=? ORDER BY created_at DESC'),

  // Preferences
  upsertPrefs: db.prepare(`
    INSERT INTO preferences (email,language,region,categories,notifications)
    VALUES (?,?,?,?,?)
    ON CONFLICT(email) DO UPDATE SET
      language=excluded.language, region=excluded.region,
      categories=excluded.categories, notifications=excluded.notifications,
      updated_at=datetime('now')
  `),
  getPrefs: db.prepare('SELECT * FROM preferences WHERE email=?'),

  // Reactions
  upsertReaction:   db.prepare('INSERT OR IGNORE INTO article_reactions (article_id,email,type) VALUES (?,?,?)'),
  deleteReaction:   db.prepare('DELETE FROM article_reactions WHERE article_id=? AND email=? AND type=?'),
  getReactions:     db.prepare('SELECT type, COUNT(*) as count FROM article_reactions WHERE article_id=? GROUP BY type'),
  getUserReactions: db.prepare('SELECT type FROM article_reactions WHERE article_id=? AND email=?'),

  // Comments
  addComment:     db.prepare('INSERT INTO comments (article_id,email,name,avatar,body) VALUES (?,?,?,?,?)'),
  getComments:    db.prepare('SELECT * FROM comments WHERE article_id=? ORDER BY created_at DESC'),
  deleteComment:  db.prepare('DELETE FROM comments WHERE id=? AND email=?'),
};

module.exports = { db, stmt };

// database/connection.js
import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Get a database connection
 * @returns {Database} Database instance
 */
export function getDatabase() {
  const db = new Database(path.join(__dirname, '..', 'database', 'test.db'));

  // Enable foreign keys
  db.pragma('foreign_keys = ON');

  return db;
}

/**
 * Close database connection
 * @param {Database} db - Database instance to close
 */
export function closeDatabase(db) {
  if (db && !db.closed) {
    console.log('Closing DB.....');
    db.close();
    console.log('DB Closed');
  }
}

export const queries = {
  users: 'SELECT * FROM users',
  creditCards: 'SELECT * FROM creditCards',
  accounts: 'SELECT * FROM accounts',
};

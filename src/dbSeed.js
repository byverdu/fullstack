import Database from "better-sqlite3";
import path from "path";
import { faker } from "@faker-js/faker";
/**
 * Initialize the database with tables and sample data
 */
function initializeDatabase() {
  try {
    // Create/connect to database file
    const dbPath = path.join(process.cwd(), "database", "test.db");
    const db = new Database(dbPath);

    console.log("Connected to SQLite database successfully");

    // Enable foreign keys
    db.pragma("foreign_keys = ON");

    // Create tables
    createTables(db);

    // Insert sample data
    insertSampleData(db);

    console.log("Database initialized successfully");

    // Close the database connection
    db.close();
  } catch (error) {
    console.error("Database initialization failed:", error);
    process.exit(1);
  }
}

/**
 * Create all necessary tables
 * @param {Database} db - Database instance
 */
function createTables(db) {
  // Users table
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      username TEXT UNIQUE NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Posts table
  db.exec(`
    CREATE TABLE IF NOT EXISTS accounts (
      id TEXT PRIMARY KEY,
      nickname TEXT NOT NULL,
      user_id TEXT NOT NULL,
      balance INTEGER NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
    )
  `);

  // Comments table
  db.exec(`
    CREATE TABLE IF NOT EXISTS creditCards (
      id TEXT PRIMARY KEY,
      nickname TEXT NOT NULL,
      user_id TEXT NOT NULL,
      account_id TEXT NOT NULL,
      balance INTEGER NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
      FOREIGN KEY (account_id) REFERENCES accounts (id) ON DELETE CASCADE
    )
  `);

  console.log("Tables created successfully");
}

/**
 * Insert sample data into the database
 * @param {Database} db - Database instance
 */
function insertSampleData(db) {
  // Insert sample users
  const insertUser = db.prepare(`
    INSERT OR IGNORE INTO users (id, username, email, password_hash)
    VALUES (?, ?, ?, ?)
  `);

  const insertAccount = db.prepare(`
    INSERT OR IGNORE INTO accounts (id, nickname, user_id, balance)
    VALUES (?, ?, ?, ?)
  `);

  const insertCreditCard = db.prepare(`
    INSERT OR IGNORE INTO creditCards (id, nickname, user_id, account_id, balance)
    VALUES (?, ?, ?, ?, ?)
  `);

  Array.from({ length: 10 }).forEach((_, index) => {
    const userId = faker.string.uuid();
    const accountId = faker.string.uuid();
    insertUser.run(
      userId,
      faker.internet.username(),
      faker.internet.email(),
      faker.internet.password()
    );
    insertAccount.run(
      accountId,
      faker.finance.accountName(),
      userId,
      faker.finance.amount(100, 1000000)
    );
    if (index % 2 === 0) {
      const creditCardId = faker.string.uuid();
      insertCreditCard.run(
        creditCardId,
        faker.finance.accountName(),
        userId,
        accountId,
        faker.finance.amount(100, 1000000)
      );
    }
  });

  console.log("Sample data inserted successfully");
}

// Run the initialization
initializeDatabase();

const express = require("express");
const path = require("path");
const app = express();

// Add static file serving middleware
app.use(express.static(path.join(__dirname, "../client")));

// Global database reference
let db = null;
let queries = null;

// Initialize database connection
async function initializeDatabase() {
  try {
    const dbModule = await import("../database/index.js");
    const { getDatabase, closeDatabase, queries: dbQueries } = dbModule;

    db = getDatabase();
    queries = dbQueries;

    console.log("Database connected successfully");

    // Graceful shutdown handlers
    const gracefulShutdown = (signal) => {
      console.log(`Received ${signal}. Closing database connection...`);
      if (db) {
        closeDatabase(db);
        process.exit(0);
      }
    };

    process.on("SIGTERM", (signal) => gracefulShutdown("SIGTERM"));
    process.on("SIGINT", () => gracefulShutdown("SIGINT"));

    // Handle uncaught exceptions
    process.on("uncaughtException", (error) => {
      console.error("Uncaught Exception:", error);
      process.exit(1);
    });
    process.on("unhandledRejection", (reason, promise) => {
      console.error("Unhandled Rejection at:", promise, "reason:", reason);
      process.exit(1);
    });

    return true;
  } catch (error) {
    console.error("Failed to initialize database:", error);
    process.exit(1);
  }
}

// Middleware to ensure database is available
app.use((_, res, next) => {
  if (!db) {
    return res.status(503).json({ error: "Database not available" });
  }
  next();
});

// Routes
app.get("/", (_, res) => {
  res.sendFile(path.join(__dirname, "../client/index.html"));
});

app.get("/users", (_, res) => {
  try {
    const users = db.prepare(queries.users).all();
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/accounts", (_, res) => {
  try {
    const accounts = db.prepare(queries.accounts).all();
    res.json(accounts);
  } catch (error) {
    console.error("Error fetching accounts:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/creditCards", (_, res) => {
  try {
    const creditCards = db.prepare(queries.creditCards).all();
    res.json(creditCards);
  } catch (error) {
    console.error("Error fetching credit cards:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = { app, initializeDatabase };

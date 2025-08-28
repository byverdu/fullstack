const express = require('express');
const path = require('path');
const app = express();

const middleware = require('./middleware.cjs');
const controllers = require('./controllers.cjs');

// Add static file serving middleware
app.use(express.static(path.join(__dirname, '../client')));

// Global database reference
let db = null;
let queries = null;

// Initialize database connection
async function initializeDatabase() {
  try {
    const dbModule = await import('../database/index.js');
    const { getDatabase, closeDatabase, queries: dbQueries } = dbModule;

    db = getDatabase();
    queries = dbQueries;

    console.log('Database connected successfully');

    // Graceful shutdown handlers
    const gracefulShutdown = signal => {
      console.log(`Received ${signal}. Closing database connection...`);
      if (db) {
        closeDatabase(db);
        process.exit(0);
      }
    };

    process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
    process.on('SIGINT', () => gracefulShutdown('SIGINT'));

    // Handle uncaught exceptions
    process.on('uncaughtException', error => {
      console.error('Uncaught Exception:', error);
      process.exit(1);
    });
    process.on('unhandledRejection', (reason, promise) => {
      console.error('Unhandled Rejection at:', promise, 'reason:', reason);
      process.exit(1);
    });

    return true;
  } catch (error) {
    console.error('Failed to initialize database:', error);
    process.exit(1);
  }
}

initializeDatabase()
  .then(() => {
    // Middleware to ensure database is available
    app.use(middleware(db).dbConnected);

    // Routes
    app.get('/', controllers(db, queries).getRoot);
    app.get('/users', controllers(db, queries).getAllUsers);
    app.get('/accounts', controllers(db, queries).getAllAcoounts);
    app.get('/creditCards', controllers(db, queries).getAllCreditCards);
  })
  .catch(error => {
    console.error('Failed to start server:', error);
    process.exit(1);
  });

module.exports = app;

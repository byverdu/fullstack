const middleware = db => {
  const dbConnected = (_, res, next) => {
    if (!db) {
      return res.status(503).json({ error: 'Database not available' });
    }
    next();
  };

  return { dbConnected };
};

module.exports = middleware;

const path = require('path');

const controllers = (db, queries) => {
  const getRoot = (_, res) => {
    res.sendFile(path.join(__dirname, '../client/index.html'));
  };

  const getAllUsers = (_, res) => {
    try {
      const users = db.prepare(queries.users).all();
      res.json(users);
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  const getAllAcoounts = (_, res) => {
    try {
      const accounts = db.prepare(queries.accounts).all();
      res.json(accounts);
    } catch (error) {
      console.error('Error fetching accounts:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  const getAllCreditCards = (_, res) => {
    try {
      const creditCards = db.prepare(queries.creditCards).all();
      res.json(creditCards);
    } catch (error) {
      console.error('Error fetching credit cards:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  return {
    getRoot,
    getAllUsers,
    getAllAcoounts,
    getAllCreditCards,
  };
};

module.exports = controllers;

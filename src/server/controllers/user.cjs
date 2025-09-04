const bcrypt = require('bcryptjs');

module.exports = (db, queries) => {
  const getAllUsers = (_, res) => {
    try {
      const users = db.prepare(queries.users).all();
      res.json(users);
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  const addUser = async (req, res) => {
    try {
      const { username, email, password } = req.body;
      const user = db.prepare(queries.getUserByEmail).get(email);

      if (user) {
        return res.status(400).json({ error: 'User already exists' });
      }

      const id = crypto.randomUUID();
      const hashedPassword = await bcrypt.hash(password, 10);
      const stmt = db.prepare(queries.addUser);

      stmt.run(id, username, email, hashedPassword);
      res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  };

  const getUserBy = (req, res) => {
    try {
      const { type, value } = req.query;

      const query =
        type === 'username' ? queries.getUserByName : queries.getUserByEmail;
      const user = db.prepare(query).get(value);

      if (!user) {
        return res.status(400).json({ error: 'User does not exists' });
      }

      res.status(201).json({ ...user });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  };

  return { getAllUsers, addUser, getUserBy };
};

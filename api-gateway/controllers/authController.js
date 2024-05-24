const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('../config');

const authenticate = async (req, res) => {
  const { username, password } = req.body;
  const user = await getUserByUsername(username);
  if (!user) {
    return res.status(401).json({ error: 'Invalid username or password' });
  }
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    return res.status(401).json({ error: 'Invalid username or password' });
  }
  const token = generateToken(user);
  res.json({ token });
};

const generateToken = (user) => {
  const payload = { userId: user.id, username: user.username };
  return jwt.sign(payload, config.auth.jwtSecret, { expiresIn: config.auth.jwtExpiration });
};

const getUserByUsername = async (username) => {
  const db = require('../database');
  const query = `SELECT * FROM users WHERE username = $1`;
  const result = await db.query(query, [username]);
  return result.rows[0];
};

module.exports = { authenticate };

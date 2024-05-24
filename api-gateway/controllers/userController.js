const userService = require('../services/userService');

const getUser = async (req, res) => {
  const userId = req.params.userId;
  const user = await userService.getUser(userId);
  res.json(user);
};

const createUser = async (req, res) => {
  const { username, email, password } = req.body;
  const user = await userService.createUser(username, email, password);
  res.json(user);
};

const updateUser = async (req, res) => {
  const userId = req.params.userId;
  const { username, email, password } = req.body;
  const user = await userService.updateUser(userId, username, email, password);
  res.json(user);
};

const deleteUser = async (req, res) => {
  const userId = req.params.userId;
  await userService.deleteUser(userId);
  res.status(204).json({ message: 'User deleted successfully' });
};

module.exports = { getUser, createUser, updateUser, deleteUser };

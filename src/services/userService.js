const User = require('../models/User');

const findUserByUsername = async (username) => {
  return User.findOne({ user: username });
};

const createUser = async (userData) => {
  const newUser = new User(userData);
  return newUser.save();
};

module.exports = {
  findUserByUsername,
  createUser,
};

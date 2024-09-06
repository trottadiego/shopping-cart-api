const User = require('../models/User');

const findUserByUsername = async (username) => {
  return User.findOne({ user: username });
};

const createUser = async (user, password) => {
  const newUser = new User(user, password);
  return newUser.save();
};

module.exports = {
  findUserByUsername,
  createUser,
};

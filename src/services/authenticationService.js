const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const findUserByUsername = async (username) => {
  return User.findOne({ user: username });
};

const createUser = async (username, password) => {
  const newUser = new User({ user: username, password: password });
  return newUser.save();
};

const comparePasswords = async (enteredPassword, storedPassword) => {
  return bcrypt.compare(enteredPassword, storedPassword);
};

const generateToken = (userId) => {
  const payload = { user: { id: userId } };
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.TOKEN_EXPIRATION || "10h",
  });
};

module.exports = {
  findUserByUsername,
  createUser,
  comparePasswords,
  generateToken,
};

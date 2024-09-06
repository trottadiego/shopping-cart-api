const User = require("../models/User");

class UserService {
  static async findByUsername(user) {
    return User.findOne({ user });
  }

  static async createUser(userData) {
    const newUser = new User(userData);
    return newUser.save();
  }
}

module.exports = UserService;

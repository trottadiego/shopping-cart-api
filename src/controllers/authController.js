const authService = require('../services/authService');

const register = async (req, res) => {
  const { user, password } = req.body;

  try {
    const userExist = await authService.findUserByUsername(user);
    if (userExist) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    const newUser = await authService.createUser(user, password);
    const token = authService.generateToken(newUser.id);

    res.json({ token });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const login = async (req, res) => {
  const { user, password } = req.body;

  try {
    const userExist = await authService.findUserByUsername(user);
    if (!userExist) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const isMatch = await authService.comparePasswords(password, userExist.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const token = authService.generateToken(userExist.id);
    res.json({ token });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = { register, login };

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Register = require('../models/register');
const Login = require('../models/login');

const registerUser = async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(req.body.password, salt);

  const user = new Register({
    email: req.body.email,
    username: req.body.username,
    password: hash
  });

  try {
    const userData = await user.save();
    res.status(200).json(userData);
  } catch(error) {
    res.status(400).json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    // check if email exists
    const user = await Login.findOne({ email: req.body.email });

    // compare the input and the actual password
    const match = await bcrypt.compare(req.body.password, user.password);

    if (!match) {
      return res.status(400).send('Passwords do not match');
    }

    // Create json web token
    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email
      },
      process.env.JWT_SECRET,
      { expiresIn:"24h" }
    );

    res.status(200).send({
      message: "Login Successful",
      userData: user,
      token
    });

  } catch (error) {
    res.status(404).send({
      message: 'Email not found',
      error
    });
  }
};

module.exports = { registerUser, loginUser };

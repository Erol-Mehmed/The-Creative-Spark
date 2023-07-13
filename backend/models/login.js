const mongoose = require('mongoose');

const loginSchema = new mongoose.Schema({
  email: {
    required: true,
    type: String
  },
  password: {
    required: true,
    type: String
  },
});

const Login = mongoose.model("Login", loginSchema, 'users');

module.exports = Login;

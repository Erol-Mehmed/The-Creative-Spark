const mongoose = require('mongoose');

const registerSchema = new mongoose.Schema({
  username: {
    required: true,
    type: String
  },
  email: {
    required: true,
    type: String
  },
  password: {
    required: true,
    type: String
  },
});

const Register = mongoose.model("Register", registerSchema, 'users');

module.exports = Register;

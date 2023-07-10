const mongoose = require('mongoose');

const registerSchema = new mongoose.Schema({
  email: {
    required: true,
    type: String
  },
  password: {
    required: true,
    type: String
  },
  username: {
    required: true,
    type: String
  },
});

const Register = mongoose.model("Register", registerSchema, 'users');

module.exports = Register;

const mongoose = require('mongoose');

const reportSchema = require('./Report');

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  email: {
    type: String,
  },
  level: {
    type: String,
    required: true,
    enum: [ 'user', 'dev', 'admin' ],
    default: 'user',
  },
  reports: {
    type: [ reportSchema ],
    unique: false,
    default: [],
  },
});

module.exports = mongoose.model('User', userSchema);

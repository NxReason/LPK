const mongoose = require('mongoose');

const User = require('./User');
const Model = require('./Model');
const Image = require('./Image');

mongoose.Promise = global.Promise;

function connect(path) {
  return mongoose.connect(path);
}

module.exports = {
  connect,
  models: {
    User,
    Model,
    Image,
  },
};

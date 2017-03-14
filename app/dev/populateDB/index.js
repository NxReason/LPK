const User = require('../../models').User;

const STUB_USERS = require('./stub_users');

function populateUsers(users) {
  return User.bulkCreate(users)
}

function populate() {
  return Promise.all([ populateUsers(STUB_USERS) ])
}

module.exports = populate;

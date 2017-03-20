'use strict';
const bcrypt = require('bcrypt-nodejs');

module.exports = {
  up: function (queryInterface, Sequelize) {
    const now = new Date();
    const usersRaw = [
      {
        username: 'Admin',
        firstname: 'John',
        lastname: 'Doe',
        password: 'verysecret',
        email: 'admin@mail.com',
        level: 'admin'
      },
      {
        username: 'DeveloperOne',
        firstname: 'Jane',
        lastname: 'Doe',
        password: 'secret',
        email: 'dev@company.com',
        level: 'dev'
      },
      {
        username: 'DeveloperTwo',
        firstname: 'Alan',
        lastname: 'Turing',
        password: 'wow',
        email: 'rly@tho.com',
        level: 'dev'
      },
      {
        username: 'UserOne',
        firstname: 'Alonzo',
        lastname: 'Church',
        password: 'wowagain',
        email: 'user@mail.com',
        level: 'user'
      },
      {
        username: 'UserTwo',
        firstname: 'Haskell',
        lastname: 'Curry',
        password: 'iamout',
        email: 'other@mail.com',
        level: 'user'
      }
    ];
    const users = usersRaw.map(user => {
      user.password = bcrypt.hashSync(user.password);
      user.createdAt = now;
      user.updatedAt = now;
      return user;
    });
    return queryInterface.bulkInsert('Users', users);
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
    return queryInterface.bulkDelete('Users', null, {});
  }
};

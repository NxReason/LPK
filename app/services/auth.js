const User = require('../database/models').User;
const bcrypt = require('bcrypt-nodejs');

const INVALID_INPUT_DATA = 'Логин и пароль должны быть указаны';
const INVALID_USER_MSG = 'Пользователь не найден';
const INVALID_PASS_MSG = 'Неверный пароль';

function auth(username, password) {
  return new Promise((resolve, reject) => {
    if (!username || !password) {
      reject(INVALID_INPUT_DATA);
    }
    User.findOne({ where: { username } })
    .then((user) => {
      if (!user) reject(INVALID_USER_MSG);
      else {
        bcrypt.compare(password, user.password, (err, res) => {
          if (err || !res) reject(INVALID_PASS_MSG);

          resolve({
            id: user.id,
            username: user.username,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            level: user.level,
          });
        });
      }
    });
  });
}

module.exports = auth;

const { User } = require('../database/').models;
const bcrypt = require('bcrypt-nodejs');

const INVALID_INPUT_DATA = 'Логин и пароль должны быть указаны';
const INVALID_USER_MSG = 'Пользователь не найден';
const INVALID_PASS_MSG = 'Неверный пароль';

function auth(username, password) {
  console.log(`Username: ${username}, password: ${password}`);
  return new Promise((resolve, reject) => {
    if (!username || !password) {
      reject(INVALID_INPUT_DATA);
    }
    User.findOne({ username })
      .then((user) => {
        if (!user) reject(INVALID_USER_MSG);
        else {
          bcrypt.compare(password, user.password, (err, res) => {
            if (err || !res) reject(INVALID_PASS_MSG);

            resolve({
              _id: user._id,
              username: user.username,
              firstname: user.firstName,
              lastname: user.lastName,
              email: user.email,
              level: user.level,
            });
          });
        }
      });
  });
}

module.exports = auth;

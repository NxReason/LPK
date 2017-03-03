'use strict';
const bcrypt = require('bcrypt-nodejs');

module.exports = function(sequelize, DataTypes) {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: DataTypes.STRING,
    level: {
      type: DataTypes.ENUM('user', 'dev', 'admin'),
      allowNull: false,
      defaultValue: 'user'
    }
  }, {
    indexes: [
      {
        unique: true,
        fields: ['username']
      }
    ],
    classMethods: {
      associate: (models) => {
        // associations can be defined here
      },
      authorize: (username, password) => {
        return new Promise((resolve, reject) => {
          User.findOne({ where: { username: username } })
          .then(user => {
            if ( !user ) reject('Пользователь не найден');
            else {
              
              bcrypt.compare(password, user.password, (err, res) => {
                if ( err || !res ) reject('Неверный пароль');

                resolve({
                  id: user.id,
                  firstname: user.firstname,
                  lastname: user.lastname,
                  email: user.email,
                  level: user.level
                });
              });

            }
          });
        });
      }
    }
  });
  User.beforeCreate(hashPassword);
  User.beforeUpdate(hashPassword);
  return User;
};

function hashPassword(user, options) {
  if (!user.changed('password')) return;

  return new Promise((resolve, reject) => {
    bcrypt.hash(user.password, null, null, (err, hash) => {
      if (err) reject(err);
      else resolve(hash);
    })
  })
  .then(hashedPassword => user.password = hashedPassword);
}

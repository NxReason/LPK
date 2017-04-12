'use strict';
const hashPassword = require('../../services/hashPassword');

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
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
    classMethods: {
      associate: models => {
        // associations can be defined here
        User.hasMany(models.Model, {
          foreignKey: 'developerId',
          as: 'createdModels'
        });
      }
    }
  });
  User.beforeCreate(hashPassword);
  User.beforeUpdate(hashPassword);
  User.beforeBulkUpdate(function(options = {}) {
    options.individualHooks = true;
    return options;
  });

  return User;
};

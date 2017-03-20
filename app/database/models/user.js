'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false
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
      }
    }
  });
  return User;
};

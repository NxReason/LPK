const hashPassword = require('../services/auth/hashPassword');

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
    underscored: true,
    indexes: [
      {
        unique: true,
        fields: ['username']
      }
    ],
    classMethods: {
      associate: (models) => {
        // associations can be defined here
      }
    }
  });
  User.beforeBulkCreate(function(users) {
    return Promise.all(users.map(user => hashPassword(user)));
  });
  User.beforeCreate(hashPassword);
  User.beforeUpdate(hashPassword);
  return User;
};

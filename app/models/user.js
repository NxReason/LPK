'use strict';
module.exports = function(sequelize, DataTypes) {
  const User = sequelize.define('User', {
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    middlename: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    level: DataTypes.NUMBER
  }, {
    classMethods: {
      associate: (models) => {
        // associations can be defined here
      }
    }
  });
  return User;
};

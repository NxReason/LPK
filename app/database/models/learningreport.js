'use strict';
module.exports = function(sequelize, DataTypes) {
  var LearningReport = sequelize.define('LearningReport', {
    steps: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return LearningReport;
};
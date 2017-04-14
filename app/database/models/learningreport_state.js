'use strict';
module.exports = function(sequelize, DataTypes) {
  var LearningReport_State = sequelize.define('LearningReport_State', {
    time_spent: DataTypes.INTEGER,
    actions_number: DataTypes.INTEGER,
    is_inactive: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return LearningReport_State;
};
'use strict';
module.exports = function(sequelize, DataTypes) {
  var ActionTool = sequelize.define('ActionTool', {
    boolValue: DataTypes.BOOLEAN,
    minValue: DataTypes.INTEGER,
    maxValue: DataTypes.INTEGER
  }, {
    timestamps: false,
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return ActionTool;
};

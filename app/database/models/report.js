'use strict';
module.exports = function(sequelize, DataTypes) {
  var Report = sequelize.define('Report', {
    modelName: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'Неизвестная модель',
    },
    maxSteps: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: -1
    }
  }, {
    timestamps: true,
    updatedAt: false,
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Report.hasMany(models.ReporState, {
          foreignKey: 'reportId',
          as: 'states',
        });
      }
    }
  });
  return Report;
};

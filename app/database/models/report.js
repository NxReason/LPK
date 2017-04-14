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
        Report.hasMany(models.ReportState, {
          foreignKey: 'reportId',
          as: 'states',
        });
        Report.belongsTo(models.User, {
          foreignKey: 'userId',
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE'
        });
      }
    }
  });
  return Report;
};

'use strict';
module.exports = function(sequelize, DataTypes) {
  var ReportState = sequelize.define('ReportState', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'Неизвестное состояние',
    },
    maxTime: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: -1,
    },
    spentTime: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: -1,
    },
    actionsNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: -1,
    },
    inactive: DataTypes.BOOLEAN
  }, {
    timestamps: false,
    classMethods: {
      associate: function(models) {
        ReportState.belongsTo(models.Report, {
          foreignKey: 'reportId',
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
        });
      }
    }
  });
  return ReportState;
};

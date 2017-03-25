'use strict';
module.exports = function(sequelize, DataTypes) {
  var Parameter = sequelize.define('Parameter', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'Параметр'
    },
    value: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    timestamps: false,
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Parameter.belongsTo(models.State, {
          foreignKey: 'stateId',
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE'
        });
      }
    }
  });
  return Parameter;
};

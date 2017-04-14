'use strict';
module.exports = function(sequelize, DataTypes) {
  var Model = sequelize.define('Model', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      default: 'Название модели'
    },
    breakTime: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1000
    },
    steps: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 10
    },
    initialState: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Model.belongsTo(models.User, {
          foreignKey: 'developerId',
          onDelete: 'SET NULL',
          onUpdate: 'CASCADE',
          as: 'developer'
        });

        Model.hasMany(models.State, {
          foreignKey: 'modelId',
          as: 'states'
        });

        Model.hasMany(models.Tool, {
          foreignKey: 'modelId',
          as: 'tools'
        });
      }
    }
  });
  return Model;
};

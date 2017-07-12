'use strict';

module.exports = function(sequelize, DataTypes) {
  const State = sequelize.define('State', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'Название состояния'
    },
    img: {
      type: DataTypes.STRING,
      defaultValue: 'state1.png'
    },
    last: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: false
    }
  }, {
    timestamps: false,
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        State.belongsTo(models.Model, {
          foreignKey: 'modelId',
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE'
        });
        State.hasMany(models.Parameter, {
          foreignKey: 'stateId',
          as: 'params'
        });
        State.hasOne(models.Event, {
          foreignKey: 'stateId',
          as: 'event'
        });
        State.belongsTo(models.Image, {
          foreignKey: 'imageId',
          onDelete: 'set null',
          onUpdate: 'cascade',
        });
        State.hasMany(models.Action, {
          foreignKey: 'stateId',
          as: 'actions'
        });
      }
    }
  });
  return State;
};

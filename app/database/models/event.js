'use strict';
module.exports = function(sequelize, DataTypes) {
  var Event = sequelize.define('Event', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'Название события'
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'Описание события'
    }
  }, {
    timestamps: false,
    classMethods: {
      associate: function(models) {
        Event.belongsTo(models.State, {
          foreignKey: 'stateId',
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE'
        });
      }
    }
  });
  return Event;
};

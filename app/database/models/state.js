'use strict';
module.exports = function(sequelize, DataTypes) {
  var State = sequelize.define('State', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'Название состояния'
    },
    img: {
      type: DataTypes.STRING,
      defaultValue: 'state1.png'
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        State.belongsTo(models.Model, {
          foreignKey: 'modelId',
          // onDelete: 'CASCADE',
          onUpdate: 'CASCADE'
        });
      }
    }
  });
  return State;
};

'use strict';
module.exports = function(sequelize, DataTypes) {
  var Action = sequelize.define('Action', {
    nextState: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    minTime: DataTypes.INTEGER,
    maxTime: DataTypes.INTEGER,
    inactive: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  }, {
    timestamps: false,
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Action.belongsTo(models.State, {
          foreignKey: 'stateId',
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE'
        });

        Action.belongsToMany(models.Tool, {
          through: models.ActionTool,
          foreignKey: 'actionId',
          otherKey: 'toolId',
          as: 'tools'
        });
      }
    }
  });
  return Action;
};

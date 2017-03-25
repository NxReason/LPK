'use strict';
module.exports = function(sequelize, DataTypes) {
  var Tool = sequelize.define('Tool', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'Прибор'
    },
    type: {
      type: DataTypes.ENUM('switch', 'range'),
      allowNull: false,
      defaultValue: 'switch'
    },
    min: DataTypes.INTEGER,
    max: DataTypes.INTEGER
  }, {
    timestamps: false,
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Tool.belongsTo(models.Model, {
          foreignKey: 'modelId',
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE'
        });
      }
    }
  });
  return Tool;
};

'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('ActionTools', {
      actionId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        references: {
          model: 'Actions',
          key: 'id',
          as: 'actionId'
        }
      },
      toolId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        references: {
          model: 'Actions',
          key: 'id',
          as: 'toolId'
        }
      },
      boolValue: {
        type: Sequelize.BOOLEAN
      },
      minValue: {
        type: Sequelize.INTEGER
      },
      maxValue: {
        type: Sequelize.INTEGER
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('ActionTools');
  }
};

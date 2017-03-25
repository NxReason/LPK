'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Actions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nextState: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      minTime: {
        type: Sequelize.INTEGER,
      },
      maxTime: {
        type: Sequelize.INTEGER
      },
      inactive: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      stateId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        references: {
          model: 'States',
          key: 'id',
          as: 'stateId'
        }
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Actions');
  }
};

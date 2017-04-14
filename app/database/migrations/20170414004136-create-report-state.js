'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('ReportStates', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'Неизвестное состояние',
      },
      maxTime: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: -1,
      },
      spentTime: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: -1,
      },
      actionsNumber: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: -1,
      },
      inactive: {
        type: Sequelize.BOOLEAN
      },
      reportId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        references: {
          model: 'Reports',
          key: 'id',
          as: 'reportId'
        }
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('ReportStates');
  }
};

'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Models', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        default: 'Название модели'
      },
      breakTime: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1000
      },
      steps: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 10
      },
      initialState: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      developerId: {
        type: Sequelize.INTEGER,
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
        references: {
          model: 'Users',
          key: 'id',
          as: 'developerId'
        }
      }
    });
  },
  down: function(queryInterface/*, Sequelize*/) {
    return queryInterface.dropTable('Models');
  }
};

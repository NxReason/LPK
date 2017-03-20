'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('States', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'Название состояния'
      },
      img: {
        type: Sequelize.STRING,
        defaultValue: 'state1.png'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      modelId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        references: {
          model: 'Models',
          key: 'id',
          as: 'modelId'
        }
      }
    });
  },
  down: function(queryInterface/*, Sequelize*/) {
    return queryInterface.dropTable('States');
  }
};

'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('sales', {
      salesid: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      menuid: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      itemid: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      discount: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      sold: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('sales');
  }
};
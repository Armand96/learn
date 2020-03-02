'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('items', {
      itemid: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER.UNSIGNED.ZEROFILL
      },
      itemname: {
        type: Sequelize.STRING(60),
        allowNull: false,
        unique: true
      },
      menuid: {
        type: Sequelize.INTEGER.UNSIGNED.ZEROFILL,
        allowNull: false,
        defaultValue: 0
      },
      itemdesc: {
        type: Sequelize.TEXT,
        allowNull: false,
        defaultValue: ""
      },
      itemprice: {
        type: Sequelize.FLOAT.UNSIGNED.ZEROFILL,
        allowNull: false,
        defaultValue: 0
      },
      itemimage: {
        type: Sequelize.STRING(60),
        allowNull: false,
        defaultValue: ""
      },
      show: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      out_of_stock: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
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
    return queryInterface.dropTable('items');
  }
};
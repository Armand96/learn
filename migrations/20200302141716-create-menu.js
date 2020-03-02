'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('menus', {
      menuid: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      menuname: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: true,
      },
      menudesc: {
        type: Sequelize.TEXT,
        allowNull: false,
        unique: true,
        defaultValue: ""
      },
      menuimage: {
        type: Sequelize.STRING(50),
        allowNull: false,
        defaultValue: ""
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
    return queryInterface.dropTable('menus');
  }
};
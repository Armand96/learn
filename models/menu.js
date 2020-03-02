const Sequelize = require("sequelize");
const db = require("../config/dbConnection");

const Menu = db.define("menu", {
  menuid: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER.UNSIGNED.ZEROFILL
  },
  menuname: {
    type: Sequelize.STRING(50),
    allowNull: false,
    unique: true
  },
  menudesc: {
    type: Sequelize.TEXT,
    allowNull: false,
    defaultValue: ""
  },
  menuimage: {
    type: Sequelize.STRING(50),
    allowNull: false,
    defaultValue: ""
  }
}, {
  defaultScope: {
    attributes: { exclude: ['createdAt', 'updatedAt'] }
  }
});

// Item.sync({});

module.exports = Item;
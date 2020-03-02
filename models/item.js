const Sequelize = require("sequelize");
const db = require("../config/dbConnection");

const Item = db.define("item", {
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
  }
}, {
  defaultScope: {
    attributes: { exclude: ['createdAt', 'updatedAt'] }
  }
});

// Item.sync({});

module.exports = Item;
const Sequelize = require("sequelize");
const db = require("../config/dbConnection");

const Sale = db.define("sale", {
  salesid: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER.UNSIGNED.ZEROFILL
  },
  menuid: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  itemid: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  priceperitem: {
    type: Sequelize.FLOAT,
    allowNull: false
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  discount: {
    type: Sequelize.FLOAT,
    allowNull: false
  },
  total: {
    type: Sequelize.FLOAT,
    allowNull: false
  },
}, {
  defaultScope: {
    attributes: { exclude: ['createdAt', 'updatedAt'] }
  }
});

// Item.sync({});

module.exports = Sale;
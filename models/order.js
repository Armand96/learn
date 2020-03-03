const Sequelize = require("sequelize");
const db = require("../config/dbConnection");

const Order = db.define("order", {
  orderid: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  menuid: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  itemid: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
}, {
  defaultScope: {
    attributes: { exclude: ['createdAt', 'updatedAt'] }
  }
});

// Item.sync({});

module.exports = Order;
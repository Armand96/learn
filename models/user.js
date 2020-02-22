const Sequelize = require("sequelize");
const db = require("../config/dbConnection");

const User = db.define("user", {
  userid: { type:Sequelize.INTEGER, primaryKey:true, unique:true, autoIncrement:true },
  username: { type: Sequelize.STRING(50) },
  password: { type: Sequelize.STRING }
}, {
  defaultScope: {
    attributes: { exclude: ['createdAt', 'updatedAt', 'password'] }
  }
});

// User.sync({});

module.exports = User;
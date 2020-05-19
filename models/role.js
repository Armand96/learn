'use strict';
module.exports = (sequelize, DataTypes) => {
  const role = sequelize.define('role', {
    roleid: DataTypes.INTEGER,
    rolename: DataTypes.STRING
  }, {});
  role.associate = function(models) {
    // associations can be defined here
  };
  return role;
};
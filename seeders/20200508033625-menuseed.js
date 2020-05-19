'use strict';
var faker = require("faker");

module.exports = {
    up: (queryInterface, Sequelize) => {
        var newData = [];

        for (let i = 0; i < 5; i++) {
            var seedData = {
                menuname: faker.name.findName(),
                menudesc: faker.address.streetAddress(),
                menuimage: faker.name.findName(),
                createdAt: new Date(),
                updatedAt: new Date()
            };
            newData.push(seedData);
        }

        return queryInterface.bulkInsert('menus', newData);
    },

    down: (queryInterface, Sequelize) => {
        /*
          Add reverting commands here.
          Return a promise to correctly handle asynchronicity.
    
          Example:
          return queryInterface.bulkDelete('People', null, {});
        */
    }
};

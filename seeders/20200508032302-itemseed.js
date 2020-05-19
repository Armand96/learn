'use strict';
var faker = require("faker");

module.exports = {
    up: (queryInterface, Sequelize) => {
        
        var newData = [];

        for (let i = 0; i < 10; i++) {
            var seedData = {
                itemname: faker.name.findName(),
                menuid: faker.random.number({min:1, max:20}),
                itemdesc: faker.commerce.product(),
                itemprice: faker.commerce.price(),
                itemimage: faker.name.findName()+".jpg",
                show: true,
                out_of_stock: false,
                createdAt: new Date(),
                updatedAt: new Date()
            };
            newData.push(seedData);
        }

        return queryInterface.bulkInsert('items', newData);
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

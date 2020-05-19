const sequelize = require('sequelize');

const dbconn = new sequelize("restaurant", "postgres", "armand96", {
    host: 'localhost',
    dialect: 'postgres'
});

dbconn.authenticate().then(() => {
    console.log('Database has been connected');
}).catch( err => {
    console.error(err);
})

module.exports = dbconn;
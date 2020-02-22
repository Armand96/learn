const sequelize = require('sequelize');

const dbconn = new sequelize("nodejs", "root", "", {
    host: 'localhost',
    dialect: 'mysql'
});

dbconn.authenticate().then(() => {
    console.log('Database has been connected');
}).catch( err => {
    console.error(err);
})

module.exports = dbconn;
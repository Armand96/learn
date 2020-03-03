const express = require('express'); //require('express-group-routes');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const routes = require('./routes/routes');
// const db = require('./config/dbConnection');
// const userCtrl = require('./controller/userCtrl');

app.use(express.urlencoded({extended:true}));
app.use(cors());
app.use(bodyParser());
app.use('/', routes);

// ============================ GAK RAPIH ============================
// app.get('/', (req, res)=>{
//     console.log('success');
//     res.send('success');
// });

// app.group('/api', api => {
    
//     api.group('/user', userRoute => {
        
//         userRoute.route('/')
//             .get(userCtrl.allUser)
//             .post(userCtrl.insertUser);
//     })

// })
// ============================ GAK RAPIH ============================

// ======================== ERROR LOGGING
// var fs = require('fs');
// var util = require('util');
// var log_file = fs.createWriteStream(__dirname + '/debug.log', {flags : 'w'});
// var log_stdout = process.stdout;

// console.log = function(d) { //
//   log_file.write(util.format(d) + '\n');
//   log_stdout.write(util.format(d) + '\n');
// };
// ======================== ERROR LOGGING


app.listen(3000, 'localhost',()=>console.log("Server started on port 3000"));
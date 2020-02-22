const express = require('express'); require('express-group-routes');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const db = require('./config/dbConnection');
const userCtrl = require('./controller/userCtrl');

app.use(express.urlencoded({extended:true}));
app.use(cors());
app.use(bodyParser());

app.get('/', (req, res)=>{
    console.log('success');
    res.send('success');
});

app.group('/api', api => {
    
    api.group('/user', userRoute => {
        
        userRoute.route('/')
            .get(userCtrl.allUser)
            .post(userCtrl.insertUser);
    })

})

app.listen(3000, 'localhost',()=>console.log("Server started on port 3000"));
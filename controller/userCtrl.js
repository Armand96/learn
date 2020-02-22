const userModel = require('../models/user');
const Hash = require('password-hash');

var dataResponse = {
    success:true,
    mesage:"success",
    response: ''
}

module.exports = {

    async allUser(req, res) {

        await userModel.findAll().then( data => {
            // console.log(data);
            if(data.length == 0) dataResponse.mesage = "data is empty";
            dataResponse.response = data;
            res.send(dataResponse);
        }).catch( err => {
            console.error(err);
            res.status(500).send(err);
        });

    },

    async insertUser(req, res){

        const { username, password } = req.body;
        var hashedpassword = Hash.generate(password);
        
        await userModel.create({
            username:username,
            password:hashedpassword
        }).then( data =>{
            console.log(data);
            dataResponse.response = data;
            res.send(dataResponse);
        }).catch( err => {
            console.error(err);
            res.status(500).send(err);
        });

    }

}
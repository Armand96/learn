const userModel = require('../models/user');
const seq = require('sequelize');
const Hash = require('password-hash');
const dbconn = require('../config/dbConnection');

var dataResponse = {
    success:true,
    message:"success",
    response: ''
}

module.exports = {

    async allUser(req, res) {

        await userModel.findAll().then( data => {
            
            if(data.length == 0) dataResponse.message = "data is empty";
            dataResponse.response = data;
            res.send(dataResponse);

        }).catch( err => {

            console.error(err);
            res.status(500).send(err);

        });

    },

    async insertUser(req, res){

        const { username, password, role } = req.body;
        var hashedpassword = Hash.generate(password);
        
        await userModel.create({

            username:username,
            password:hashedpassword,
            role:role

        }).then( data =>{

            console.log(data);
            
            var userData = {
                userid: data.userid,
                username: data.username,
            }

            dataResponse.response = userData;
            res.send(dataResponse);

        }).catch( err => {

            console.error(err);
            res.status(500).send(err);

        });

    },

    async singleUser(req, res){

        const userid = req.params.userid;

        await userModel.findAll({
            where: {
                userid: userid
            }
        }).then( data => {

            // console.log(data);
            dataResponse.response = data;
            res.send(dataResponse);

        }).catch( err => {
            
            console.error(err);
            res.status(500).send(err);

        });

    },

    async updatePassword(req, res){

        const userid = req.params.userid;
        const { password } = req.body;
        var hashedpassword = Hash.generate(password);

        await userModel.update({
            password: hashedpassword
        }, {
            where: {
                userid: userid
            }
        }).then( data => {

            // console.log(data);
            if(data == 1) dataResponse.message = "Success change password";
            res.send(dataResponse);

        }).catch( err => {

            console.error(err)
            res.status(500).send(err);

        });

    },

    async deleteUser(req, res){

        const userid = req.params.userid;

        await userModel.destroy({
            where: {
                userid: userid
            }
        }).then( data => {
            
            // console.log(data);
            if(data == 1) dataResponse.message = "User has been deleted";
            res.send(dataResponse);

        }).catch( err => {
            
            console.error(err);
            res.status(500).send(err);

        });

    },

    async testQuerry(req, res) {

        var sql = "SELECT * FROM users";
        await dbconn.query(sql).then(([results, metadata]) => {
            console.log(results)
            dataResponse.response = results;
            res.send(dataResponse);
        }).catch( err => {
            console.error(err);
            res.status(500).send(err);
        })

    }

}
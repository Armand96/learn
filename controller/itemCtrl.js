const itemModel = require('../models/item');

var dataResponse = {
    success: true,
    message: "success",
    response: ""
}

module.exports = {

    async testImage(req, res){

        if(req.file){
            res.send(req.file);
        }
        else throw 'error';

    },

    async allItem(req, res) {

        await itemModel.findAll().then( data => {
            
            if(data.length == 0) dataResponse.message = "data is empty";
            dataResponse.response = data;
            res.send(dataResponse);

        }).catch( err => {

            console.error(err);
            res.status(500).send(err);

        });

    },

    async insertItem(req, res){

        const { username, password } = req.body;
        var hashedpassword = Hash.generate(password);
        
        await itemModel.create({

            username:username,
            password:hashedpassword

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

    async singleItem(req, res){

        const userid = req.params.userid;

        await itemModel.findAll({
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

        await itemModel.update({
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

    async deleteItem(req, res){

        const userid = req.params.userid;

        await itemModel.destroy({
            where: {
                userid: userid
            }
        }).then( data => {
            
            // console.log(data);
            if(data == 1) dataResponse.message = "Item has been deleted";
            res.send(dataResponse);

        }).catch( err => {
            
            console.error(err);
            res.status(500).send(err);

        });

    }

}
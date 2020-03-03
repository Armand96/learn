const userModel = require('../models/user');
const Hash = require('password-hash');
const dbconn = require('../config/dbConnection');

var dataResponse = {
    success: true,
    message: "success",
    response: ''
}

var successGetMsg = "Success get User";
var successInsertMsg = "Success Insert User";
var EmptyMsg = "User is empty";
var userNotFound = "User not found";
var successUpdateMsg = "Success Update User";
var successDelMsg = "User has been deleted";

module.exports = {

    async optionalFunc(req, res) {


        const userid = req.params.userid;
        var users = (userid == undefined || userid == null) ? await userModel.findAll() : await userModel.findAll({ where: { userid: userid } });
        console.log(users);
        if (users != null && users != undefined && users.length != 0) {

            console.log(users.length);
            users.then(data => {
                if (data.length == 0) dataResponse.message = EmptyMsg;
                else dataResponse.message = successGetMsg;
                dataResponse.response = data;
                res.send(dataResponse);
            }).catch(err => {
                console.error(err);
                res.status(500).send(err);
            });

        } else {

            dataResponse.message = userNotFound;
            res.send(dataResponse);

        }


    },
    async allUser(req, res) {

        await userModel.findAll().then(data => {

            if (data.length == 0) dataResponse.message = userNotFound;
            else dataResponse.messagea = successGetMsg;
            dataResponse.response = data;
            res.send(dataResponse);

        }).catch(err => {

            console.error(err);
            res.status(500).send(err);

        });

    },

    async insertUser(req, res) {

        const { username, password, role } = req.body;
        var hashedpassword = Hash.generate(password);

        await userModel.create({

            username: username,
            password: hashedpassword,
            role: role

        }).then(data => {

            // console.log(data);

            var userData = {
                userid: data.userid,
                username: data.username,
                role: data.role
            }

            if(data){
                dataResponse.response = userData;
                dataResponse.message = successInsertMsg;
            }

            res.send(dataResponse);

        }).catch(err => {

            console.error(err);
            res.status(500).send(err);

        });

    },

    async singleUser(req, res) {

        const userid = req.params.userid;

        await userModel.findAll({
            where: {
                userid: userid
            }
        }).then(data => {

            // console.log(data);
            if(data.length == 0) dataResponse.message = userNotFound;
            else dataResponse.message = successGetMsg;
            dataResponse.response = data[0];
            res.send(dataResponse);

        }).catch(err => {

            console.error(err);
            res.status(500).send(err);

        });

    },

    async updatePassword(req, res) {

        const userid = req.params.userid;
        const { password } = req.body;
        var hashedpassword = Hash.generate(password);

        await userModel.update({
            password: hashedpassword
        }, {
            where: {
                userid: userid
            }
        }).then(data => {

            // console.log(data);
            if (data == 1) dataResponse.message = "Success change password";
            else dataResponse.message = "Failed change password";
            res.send(dataResponse);

        }).catch(err => {

            console.error(err)
            res.status(500).send(err);

        });

    },

    async deleteUser(req, res) {

        const userid = req.params.userid;

        await userModel.destroy({
            where: {
                userid: userid
            }
        }).then(data => {

            // console.log(data);
            if (data == 1) dataResponse.message = successDelMsg;
            res.send(dataResponse);

        }).catch(err => {

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
        }).catch(err => {
            console.error(err);
            res.status(500).send(err);
        })

    }

}
const itemModel = require('../models/item');
const path = require("path");
const fs = require("fs");

const handleError = (err, res) => {
    console.log(err);
    res
      .status(500)
      .contentType("text/plain")
      .end("Oops! Something went wrong!");
};

var dataResponse = {
    success: true,
    message: "success",
    response: ""
}

module.exports = {

    async testImage(req, res){

        console.log(req.file);
        const tempPath = req.file.path;
        const targetPath = path.join(__dirname, "../uploads/images/"+req.file.originalname);

        if (path.extname(req.file.originalname).toLowerCase() === ".jpg") {
            fs.rename(tempPath, targetPath, err => {
                if (err) return handleError(err, res);

                res
                .status(200)
                .contentType("text/plain")
                .end("File uploaded!");
            });
        } else {
            fs.unlink(tempPath, err => {
                if (err) return handleError(err, res);

                res
                .status(403)
                .contentType("text/plain")
                .end("Only .jpg files are allowed!");
            });
        }

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

        console.log(req.file);
        var item_img_name = "";
        const { itemname, menuid, description, price, show, out_of_stock } = req.body;

        if(req.file !== undefined){

            const tempPath = req.file.path;
            const targetPath = path.join(__dirname, "../uploads/images/"+itemname+".jpg");
            item_img_name = itemname+".jpg";
            item_img_name = item_img_name.split(' ').join('_');

            fs.rename(tempPath, targetPath, err => {
                if (err) return handleError(err, res);
            });

        }

        await itemModel.create({

            itemname:itemname,
            menuid:menuid,
            description: description,
            price: price,
            item_img_name:item_img_name,
            show: show,
            out_of_stock: out_of_stock

        }).then( data =>{

            console.log(data);
            if(data !== undefined || data !== null) dataResponse.message = "Success Insert Item";
            else dataResponse.message = "Failed Insert Item";
            dataResponse.response = data;
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

    async updateItem(req, res){

        console.log(req.file);
        const itemid = req.params.itemid;
        const { itemname, menuid, description, price, show, out_of_stock } = req.body;

        if(req.file !== undefined){

            const tempPath = req.file.path;
            const targetPath = path.join(__dirname, "../uploads/images/"+itemname+".jpg");
            item_img_name = itemname+".jpg";
            item_img_name = item_img_name.split(' ').join('_');

            fs.rename(tempPath, targetPath, err => {
                if (err) return handleError(err, res);
            });

        }

        await itemModel.update({

            itemname:itemname,
            menuid:menuid,
            description: description,
            price: price,
            item_img_name:item_img_name,
            show: show,
            out_of_stock: out_of_stock

        }, {
            where: {
                itemid: itemid
            }
        }).then( data => {

            // console.log(data);
            if(data == 1) dataResponse.message = "Success Update Item";
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
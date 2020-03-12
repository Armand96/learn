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

    async getImage(req, res){
        const imagename = req.params.imagename;
        const dir = "../uploads/images/item/"+imagename;
        const pathImage = path.join(__dirname, dir);
        var Image = path.join(__dirname, "../upload/images/blank.jpg");

        if(fs.existsSync(pathImage)){
            Image = pathImage;
        }

        res.sendFile(Image);
    },

    async testImage(req, res){

        console.log(req.file);
        const tempPath = req.file.path;
        const targetPath = path.join(__dirname, "../uploads/images/item/"+req.file.originalname);

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

            dataResponse.message = (data.length == 0) ? "Item is empty" : "Success get data";
            dataResponse.response = data;
            res.send(dataResponse);

        }).catch( err => {

            console.error(err);
            res.status(500).send(err);

        });

    },

    async insertItem(req, res){

        console.log(req.file);
        var itemimage = "";
        const { itemname, menuid, itemdesc, itemprice, show, out_of_stock } = req.body;

        if(req.file !== undefined){

            itemimage = itemname+".jpg";
            itemimage = itemimage.split(' ').join('_');

            const tempPath = req.file.path;
            const targetPath = path.join(__dirname, "../uploads/images/item/"+itemimage);

            fs.rename(tempPath, targetPath, err => {
                if (err) return handleError(err, res);
            });

        }

        await itemModel.create({

            itemname:itemname,
            menuid:menuid,
            itemdesc: itemdesc,
            itemprice: itemprice,
            itemimage:itemimage,
            show: show,
            out_of_stock: out_of_stock

        }).then( data =>{

            dataResponse.message = (data !== undefined || data !== null) ? "Success Insert Item" : "Failed Insert Item";
            dataResponse.response = data;
            res.send(dataResponse);

        }).catch( err => {

            console.error(err);
            res.status(500).send(err);

        });
    },

    async singleItem(req, res){

        const itemid = req.params.itemid;

        await itemModel.findByPk(itemid).then( data => {

            dataResponse.message = (data == null) ? "Item Not Found" : "Success Get Item";
            dataResponse.response = data;
            res.send(dataResponse);

        }).catch( err => {
            
            console.error(err);
            res.status(500).send(err);

        });

    },

    async updateItem(req, res){

        // console.log(req.file);
        // ============ get the params and data
        const itemid = req.params.itemid;
        const { itemname, menuid, itemdesc, itemprice, show, out_of_stock } = req.body;

        // ============ old data
        var olddata = {};
        await itemModel.findByPk(itemid).then(data=>{
            if(data == null){
                dataResponse.message = "Item Not Found";
                res.send(dataResponse);
                return;
            } else olddata = data;
        }).catch(err=>console.error(err));

        itemimage = itemname+".jpg";
        itemimage = itemimage.split(' ').join('_');

        const tempPath = req.file.path;
        const targetPath = path.join(__dirname, "../uploads/images/item/"+itemimage);

        if(req.file !== undefined){

            // rename file yang telah diupload
            fs.rename(tempPath, targetPath, err => {
                if (err) return handleError(err, res);

                if(oldPath != targetPath){
                    // delete file lama
                    fs.unlink(oldPath, err => {
                        if (err) return handleError(err, res);
                    });
                }

            });

        } else {

            // Jika ada file, hapus!!!
            if(fs.existsSync(targetPath)){

                fs.unlink(targetPath, err => {
                    if (err) return handleError(err, res);
                });
    
            }
        }

        await itemModel.update({

            itemname:itemname,
            menuid:menuid,
            itemdesc: itemdesc,
            itemprice: itemprice,
            itemimage:itemimage,
            show: show,
            out_of_stock: out_of_stock

        }, {
            where: {
                itemid: itemid
            }
        }).then( data => {

            dataResponse.message = (data == 1) ? "Success Update Item" : "Failed Update Item";
            dataResponse.response = data;
            res.send(dataResponse);

        }).catch( err => {

            console.error(err)
            res.status(500).send(err);

        });

    },

    async deleteItem(req, res){

        const itemid = req.params.itemid;
        var item = {};

        // ========================== DELETE FILE
        await itemModel.findByPk(itemid).then( data => {
            if(data == null){
                dataResponse.message = "Item Not Found";
                res.send(dataResponse);
                return
            } else item = data;
            // console.log(item)
        }).catch( err => console.error(err) );

        const targetPath = path.join(__dirname, "../uploads/images/item/"+item.itemimage);
        
        if(fs.existsSync(targetPath)){

            fs.unlink(targetPath, err => {
                if (err) return handleError(err, res);
            });

        }
        
        // ========================== DELETE DATA
        await itemModel.destroy({
            where: {
                itemid: itemid
            }
        }).then( data => {
            
            dataResponse.message = (data == 1) ? "Item has been deleted" : "Delete Item Failed";
            res.send(dataResponse);

        }).catch( err => {
            
            console.error(err);
            res.status(500).send(err);

        });

    }

}
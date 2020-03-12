const menuModel = require('../models/menu');
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
        const dir = "../uploads/images/menu/"+imagename;
        const pathImage = path.join(__dirname, dir);
        var Image = path.join(__dirname, "../upload/images/blank.jpg");

        if(fs.existsSync(pathImage)){
            Image = pathImage;
        }

        res.sendFile(Image);
    },

    // ====================== ALL
    async allMenu(req, res) {

        await menuModel.findAll().then( data => {
            
            if(data.length == 0) dataResponse.message = "Menu is empty";
            dataResponse.response = data;
            res.send(dataResponse);

        }).catch( err => {

            console.error(err);
            res.status(500).send(err);

        });

    },

    // ====================== INSERT
    async insertMenu(req, res){

        // console.log(req.file);
        var menuimage = "";
        const { menuname, menudesc } = req.body;

        if(req.file !== undefined){

            menuimage = menuname+".jpg";
            menuimage = menuimage.split(' ').join('_');

            const tempPath = req.file.path;
            const targetPath = path.join(__dirname, "../uploads/images/menu/"+menuimage);

            fs.rename(tempPath, targetPath, err => {
                if (err) return handleError(err, res);
            });

        }

        await menuModel.create({

            menuname: menuname,
            menudesc: menudesc,
            menuimage: menuimage,

        }).then( data =>{

            // console.log(data);
            if(data !== undefined || data !== null) dataResponse.message = "Success Insert Menu";
            else dataResponse.message = "Failed Insert Menu";
            dataResponse.response = data;
            res.send(dataResponse);

        }).catch( err => {

            console.error(err);
            res.status(500).send(err);

        });
    },

    // ====================== SINGLE DATA
    async singleMenu(req, res){

        const menuid = req.params.menuid;

        await menuModel.findByPk(menuid).then( data => {

            if(data == null) dataResponse.message = "Menu Not Found";
            dataResponse.response = data;
            res.send(dataResponse);

        }).catch( err => {
            
            console.error(err);
            res.status(500).send(err);

        });

    },

    // ====================== UPDATE
    async updateMenu(req, res){

        // console.log(req.file);
        // ============ get the params and data
        const menuid = req.params.menuid;
        const { menuname, menudesc} = req.body;


        // old data
        var olddata = {};
        await menuModel.findByPk(menuid).then( data => {
            if(data == null){
                dataResponse.message = "Menu Not Found";
                res.send(dataResponse);
                return;
            } else olddata = data;
        }).catch( err => console.error(err));


        // ========= The Image you want to save
        var menuimage = menuname+".jpg";
        menuimage = menuimage.split(' ').join('_');

        const tempPath = req.file.path;
        const oldPath = path.join(__dirname, "../uploads/images/menu/"+olddata.menuimage);
        const targetPath = path.join(__dirname, "../uploads/images/menu/"+menuimage);

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

        await menuModel.update({

            menuname: menuname,
            menudesc: menudesc,
            menuimage: menuimage,

        }, {
            where: {
                menuid: menuid
            }
        }).then( data => {

            // console.log(data);
            if(data == 1) dataResponse.message = "Success Update Menu";
            else dataResponse.message = "Failed Update Menu";
            dataResponse.response = data;
            res.send(dataResponse);

        }).catch( err => {

            console.error(err)
            res.status(500).send(err);

        });

    },

    // ====================== DELETE
    async deleteMenu(req, res){

        const menuid = req.params.menuid;
        var menu = {};

        // ========================== DELETE FILE
        await menuModel.findByPk(menuid).then( data => {
            if(data.length == 0) {
                dataResponse.message = "Menu Not Found";
                res.send(dataResponse);
                return;
            } else menu = data;
            // console.log(menu)
        }).catch( err => console.error(err) );

        const targetPath = path.join(__dirname, "../uploads/images/menu/"+menu.menuimage);
        
        if(fs.existsSync(targetPath)){

            fs.unlink(targetPath, err => {
                if (err) return handleError(err, res);
            });

        }
        
        // ========================== DELETE DATA
        await menuModel.destroy({
            where: {
                menuid: menuid
            }
        }).then( data => {
            
            // console.log(data);
            if(data == 1) dataResponse.message = "Menu has been deleted";
            else dataResponse.message = "Fail Delete Menu";
            res.send(dataResponse);

        }).catch( err => {
            
            console.error(err);
            res.status(500).send(err);

        });

    }

}
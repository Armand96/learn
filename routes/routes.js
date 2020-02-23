const routes = require('express').Router(); require('express-group-routes');
const userCtrl = require('../controller/userCtrl');
const itemCtrl = require('../controller/itemCtrl');

const multer = require('multer');
const upload = multer({dest: __dirname + '../../uploads/images'});
// var storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, '../upload/images')
//     },
//     filename: function (req, file, cb) {
//       cb(null, file.fieldname + '-' + Date.now())
//     }
//   })
// const upload = multer({ storage: storage });

routes.group('/api', api => {

    api.group('/user', userRoute => {

        userRoute.route('/')
            .get(userCtrl.allUser)
            .post(userCtrl.insertUser);

        userRoute.route('/:userid')
            .put(userCtrl.updatePassword)
            .delete(userCtrl.deleteUser);

    })

    api.group('/item', itemRoute => {

        itemRoute.route('/')
            .get(itemCtrl.allItem)
            .post(itemCtrl.insertItem);

        

    })

    api.route('/testimage')
        .post(upload.single('item_img_name'), itemCtrl.testImage);

});

module.exports = routes;
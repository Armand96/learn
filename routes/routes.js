const routes = require('express').Router(); require('express-group-routes');
const userCtrl = require('../controller/userCtrl');
const itemCtrl = require('../controller/itemCtrl');
const menuCtrl = require('../controller/menuCtrl');
const orderCtrl = require('../controller/orderCtrl');

const multer = require('multer');
const uploadItemImages = multer({dest: __dirname + '../../uploads/images/item'});
const uploadMenuImages = multer({dest: __dirname + '../../uploads/images/menu'});
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

    // ---------------- USER ROUTES
    api.group('/user', userRoute => {

        userRoute.route('/')
            .get(userCtrl.allUser)
            .post(userCtrl.insertUser);

        userRoute.route('/:userid')
            .get(userCtrl.singleUser)
            .put(userCtrl.updatePassword)
            .delete(userCtrl.deleteUser);

    });

    // ---------------- MENU ROUTES
    api.group('/menu', menuRoute => {

        menuRoute.route('/')
            .get(menuCtrl.allMenu)
            .post(uploadMenuImages.single('menuimage'), menuCtrl.insertMenu);

        menuRoute.route('/:menuid')
            .get(menuCtrl.singleMenu)
            .put(uploadMenuImages.single('menuimage'), menuCtrl.updateMenu)
            .delete(menuCtrl.deleteMenu);

    });

    // ---------------- ITEM ROUTES
    api.group('/item', itemRoute => {

        itemRoute.route('/')
            .get(itemCtrl.allItem)
            .post(uploadItemImages.single('itemimage'), itemCtrl.insertItem);

        itemRoute.route('/:itemid')
            .get(itemCtrl.singleItem)
            .put(uploadItemImages.single('itemimage'), itemCtrl.updateItem)
            .delete(itemCtrl.deleteItem);

    });

    // ---------------- ORDER ROUTES
    api.group('/order', orderRoute => {

        orderRoute.route('/')
            .get(orderCtrl.allOrder)
            .post(orderCtrl.insertOrder);
        orderRoute.route('/:orderid')
            .get(orderCtrl.singleOrder);
        orderRoute.post('/search', orderCtrl.searchOrder);

    });

    // ---------------- SALES ROUTES
    api.group('/sales', salesRoute => {

        // salesRoute.route('/')
        // salesRoute.route('/:salesid')

    })


    // ============================ TESTING
    // api.route('/testimage')
    //     .post(upload.single('itemimage'), itemCtrl.testImage);

    api.route('/testquery')
        .get(userCtrl.testQuerry);

});

module.exports = routes;
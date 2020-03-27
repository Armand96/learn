const routes = require('express').Router(); require('express-group-routes');

const userCtrl = require('../controller/userCtrl');
const itemCtrl = require('../controller/itemCtrl');
const menuCtrl = require('../controller/menuCtrl');
const orderCtrl = require('../controller/orderCtrl');
const salesCtrl = require('../controller/salesCtrl');

const multer = require('multer');
const uploadItemImages = multer({dest: __dirname + '../../uploads/images/item'});
const uploadMenuImages = multer({dest: __dirname + '../../uploads/images/menu'});

const passport = require('../config/passport');

routes.group('/api', api => {

    //protected routes
    api.get('/testprotect', passport.passport.authenticate("jwt", { session: false }), userCtrl.allUser);

    // GET IMAGES
    api.get('/itemimage/:imagename', itemCtrl.getImage);
    api.get('/menuimage/:imagename', menuCtrl.getImage);

    api.post('/login', userCtrl.login);

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
            .post(passport.passport.authenticate("jwt", { session: false }), uploadMenuImages.single('menuimage'), menuCtrl.insertMenu);

        menuRoute.route('/:menuid')
            .get(menuCtrl.singleMenu)
            .put(passport.passport.authenticate("jwt", { session: false }), uploadMenuImages.single('menuimage'), menuCtrl.updateMenu)
            .delete(passport.passport.authenticate("jwt", { session: false }), menuCtrl.deleteMenu);

    });

    // ---------------- ITEM ROUTES
    api.group('/item', itemRoute => {

        itemRoute.route('/')
            .get(itemCtrl.allItem)
            .post(passport.passport.authenticate("jwt", { session: false }), uploadItemImages.single('itemimage'), itemCtrl.insertItem);

        itemRoute.route('/:itemid')
            .get(itemCtrl.singleItem)
            .put(passport.passport.authenticate("jwt", { session: false }), uploadItemImages.single('itemimage'), itemCtrl.updateItem)
            .delete(passport.passport.authenticate("jwt", { session: false }), itemCtrl.deleteItem);
        itemRoute.post('/search', itemCtrl.searchItem);

    });

    // ---------------- ORDER ROUTES
    api.group('/order', orderRoute => {

        orderRoute.route('/')
            .get(orderCtrl.allOrder)
            .post(passport.passport.authenticate("jwt", { session: false }), orderCtrl.insertOrder);
        orderRoute.route('/:orderid')
            .get(orderCtrl.singleOrder)
            .put(passport.passport.authenticate("jwt", { session: false }), orderCtrl.orderCompletePayment);
        orderRoute.post('/search', passport.passport.authenticate("jwt", { session: false }), orderCtrl.searchOrder);

    });

    // ---------------- SALES ROUTES
    api.group('/sales', salesRoute => {

        salesRoute.route('/')
            .get(salesCtrl.allSales)
            .post(passport.passport.authenticate("jwt", { session: false }), salesCtrl.insertSales);
        salesRoute.route('/:salesid')
            .get(salesCtrl.singleSales);
        salesRoute.post('/search', passport.passport.authenticate("jwt", { session: false }), salesCtrl.searchSales);

    })


    // ============================ TESTING
    // api.route('/testimage')
    //     .post(upload.single('itemimage'), itemCtrl.testImage);

    api.route('/testquery')
        .get(userCtrl.testQuerry);

});

module.exports = routes;
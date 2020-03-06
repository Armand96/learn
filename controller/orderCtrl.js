const orderModel = require('../models/order');
const dbconn = require('../config/dbConnection');

var dataResponse = {
    success: true,
    message: "success",
    response: ""
}

module.exports = {

    async allOrder(req, res){

        var message = "";
        var sql = "SELECT orderid, menuname, itemname, itemprice, quantity, itemprice * quantity AS total "+
                    "FROM orders INNER JOIN menus ON orders.menuid = menus.menuid "+
                    "INNER JOIN items ON orders.itemid = items.itemid";

        await dbconn.query(sql).then( ([results, metadata]) => {
            // console.log(results);
            message = results.length == 0 ? "Empty Order" : "Success get Order";
            dataResponse.response = results;
            dataResponse.message = message;
            res.send(dataResponse);
        }).catch( err => {
            console.error(err);
            res.status(500).send(err);
        });

    },

    async insertOrder(req, res){

        const { menuid, itemid, quantity } = req.body;
        await orderModel.create({
            menuid: menuid,
            itemid: itemid,
            quantity: quantity
        }).then( data => {

            var orderData = {};
            if(data){

                orderData = {
                    orderid: data.orderid,
                    menuid: data.menuid,
                    itemid: data.itemid,
                    quantity: data.quantity
                }

                dataResponse.message = "Success Insert Order";

            } else dataResponse.message = "Fail Insert Order";

            dataResponse.response = orderData;
            res.send(dataResponse);            

        });


    },

    async searchOrder(req, res){

        var message = "";
        const { itemname, menuname, itemid, menuid, orderid } = req.body;

        var itemNameParam = itemname == undefined ? "" : " AND itemname LIKE '%"+itemname+"%' ";
        var menuNameParam = menuname == undefined ? "" : " AND menuname LIKE '%"+menuname+"%' ";
        var itemIdParam = itemid == undefined ? "" : " AND itemid = "+itemid+" ";
        var menuIdParam = menuid == undefined ? "" : " AND menuid = "+menuid+" ";
        var orderIdParam = orderid == undefined ? "" : " AND orderid = "+orderid+" ";

        var whereParams = (itemNameParam == "" || menuNameParam == "" || itemIdParam == "" || menuIdParam ==  "" || orderIdParam == "") ? "" : 
                            " WHERE 1=1"+itemNameParam+menuNameParam+itemIdParam+menuIdParam+orderIdParam;

        // ============================ MANUAL QUERY
        var sql = "SELECT orderid, menuname, itemname, itemprice, quantity, itemprice * quantity AS total FROM orders "+
                    "INNER JOIN menus ON orders.menuid = menus.menuid "+
                    "INNER JOIN items ON orders.itemid = items.itemid "+whereParams;
        await dbconn.query(sql).then( ([result, metadata]) => {
            message = result.length == 0 ? "Order Not Found" : "Success get Order Data";
            dataResponse.message = message;
            dataResponse.response = result;
            res.send(dataResponse);
        })

    },

    async singleOrder(req, res){

        var message = "";
        var orderid = req.params.orderid;

        // ============================ MANUAL QUERY
        var sql = "SELECT orderid, menuname, itemname, itemprice, quantity, itemprice * quantity AS total FROM orders "+
                    "INNER JOIN menus ON orders.menuid = menus.menuid "+
                    "INNER JOIN items ON orders.itemid = items.itemid WHERE orderid = "+orderid;
        await dbconn.query(sql).then( ([result, metadata]) => {
            message = result.length == 0 ? "Order Not Found" : "Success get Order Data";
            dataResponse.message = message;
            dataResponse.response = result[0];
            res.send(dataResponse);
        })


        // ============================ ORM
        // await orderModel.findAll({
        //     where: {orderid: orderid}
        // }).then( data => {

        //     message = data.length == 0 ? "Order not found" : "Success get Order";
        //     dataResponse.message = message;
        //     dataResponse.response = data;
        //     res.send(dataResponse);            

        // })

    }

}
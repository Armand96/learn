const orderModel = require('../models/order');
const dbconn = require('../config/dbConnection');

var dataResponse = {
    success: true,
    message: "success",
    response: ""
}

module.exports = {

    async insertOrder(req, res){

        var message = "";
        const { menuid, itemid } = req.body;
        await orderModel.create({
            menuid: menuid,
            itemid: itemid
        }).then( data => {

            var orderData = {};
            if(data){

                orderData = {
                    orderid: data.orderid,
                    menuid: data.menuid,
                    itemid: data.itemid,
                }

                message = "Success Insert Order";

            } else message = "Fail Insert Order";

            dataResponse.response = orderData;
            dataResponse.message = message;
            res.send(dataResponse);            

        });


    }

}
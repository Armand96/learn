const salesModel = require('../models/sale');
const dbconn = require('../config/dbConnection');

var dataResponse = {
    success: true,
    message: "success",
    response: ""
}

module.exports = {

    async allSales(req, res){
        console.log('test');
        var message = "";
        var sql = "SELECT salesid, menuname, itemname, itemprice, quantity, itemprice * quantity AS total "+
                    "FROM sales INNER JOIN menus ON sales.menuid = menus.menuid "+
                    "INNER JOIN items ON sales.itemid = items.itemid";

        await dbconn.query(sql).then( ([results, metadata]) => {
            // console.log(results);
            message = results.length == 0 ? "Empty Sales" : "Success get Sales";
            dataResponse.response = results;
            dataResponse.message = message;
            res.send(dataResponse);
        }).catch( err => {
            console.error(err);
            res.status(500).send(err);
        });

    },

    async insertSales(req, res){

        const { menuid, itemid, quantity, discount, priceperitem, total } = req.body;
        console.log(req.body);
        await salesModel.create({
            menuid: menuid,
            itemid: itemid,
            priceperitem: priceperitem,
            quantity: quantity,
            discount: discount,
            total:total
        }).then( data => {

            var salesData = {};
            if(data){

                salesData = {
                    salesid: data.salesid,
                    menuid: data.menuid,
                    itemid: data.itemid,
                    priceperitem: priceperitem,
                    quantity: data.quantity,
                    discount: data.discount,
                    total: data.total
                }

                dataResponse.message = "Success Insert Sales";

            } else dataResponse.message = "Fail Insert Sales";

            dataResponse.response = salesData;
            res.send(dataResponse);            

        });


    },

    async searchSales(req, res){

        var message = "";
        const { itemname, menuname, itemid, menuid, salesid } = req.body;

        var itemNameParam = itemname == undefined ? "" : " AND itemname LIKE '%"+itemname+"%' ";
        var menuNameParam = menuname == undefined ? "" : " AND menuname LIKE '%"+menuname+"%' ";
        var itemIdParam = itemid == undefined ? "" : " AND itemid = "+itemid+" ";
        var menuIdParam = menuid == undefined ? "" : " AND menuid = "+menuid+" ";
        var orderIdParam = salesid == undefined ? "" : " AND salesid = "+salesid+" ";

        var whereParams = (itemNameParam == "" || menuNameParam == "" || itemIdParam == "" || menuIdParam ==  "" || orderIdParam == "") ? "" : 
                            " WHERE 1=1"+itemNameParam+menuNameParam+itemIdParam+menuIdParam+orderIdParam;

        // ============================ MANUAL QUERY
        var sql = "SELECT salesid, menuname, itemname, itemprice, quantity, itemperprice * quantity AS total FROM sales "+
                    "INNER JOIN menus ON sales.menuid = menus.menuid "+
                    "INNER JOIN items ON sales.itemid = items.itemid "+whereParams;
        await dbconn.query(sql).then( ([result, metadata]) => {
            message = result.length == 0 ? "Sales Not Found" : "Success get Sales Data";
            dataResponse.message = message;
            dataResponse.response = result;
            res.send(dataResponse);
        })

    },

    async singleSales(req, res){

        var message = "";
        var salesid = req.params.salesid;

        // ============================ MANUAL QUERY
        var sql = "SELECT salesid, menuname, itemname, itemperprice, quantity, itemprice * quantity AS total FROM sales "+
                    "INNER JOIN menus ON sales.menuid = menus.menuid "+
                    "INNER JOIN items ON sales.itemid = items.itemid WHERE salesid = "+salesid;
        await dbconn.query(sql).then( ([result, metadata]) => {
            message = result.length == 0 ? "Sales Not Found" : "Success get Sales Data";
            dataResponse.message = message;
            dataResponse.response = result[0];
            res.send(dataResponse);
        })


        // ============================ ORM
        // await salesModel.findAll({
        //     where: {salesid: salesid}
        // }).then( data => {

        //     message = data.length == 0 ? "Sales not found" : "Success get Sales";
        //     dataResponse.message = message;
        //     dataResponse.response = data;
        //     res.send(dataResponse);            

        // })

    }

}
var express = require('express');
const StoreDao = require('../models/dao/storeDao');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json()
var router = express.Router();
var storedao = new StoreDao()

router.post('/info', jsonParser, (req, res) => {
    console.log(req.body.owner)
    storedao.findOne({
        username: req.body.owner,
    }, limit = {
        password: 0,
    }).then((result) => {
        console.log('findOne asdasdasdao --> ', result)
        if (result) {
            res.json({
                code: 20000,
                data: result,
                message: "Get order infomation successfully"
            })
        } else {
            res.json({
                code: 50000,
                data: {},
                message: "Order ins't exist"
            })
        }
    });
})
module.exports = router;
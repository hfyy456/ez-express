var express = require('express');
const GoodDao = require('../models/dao/goodDao');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json()
var router = express.Router();
var gooddao = new GoodDao()

router.post('/list', jsonParser, (req, res) => {
    console.log(req.user.username)
    gooddao.findAll({
        owner: req.user.username
    }).then((result) => {
        if (result) {
            res.json({
                code: 20000,
                data: result,
                message: "查询成功"
            })
        } else {
            res.json({
                code: 50000,
                data: result,
                message: "查询失败"
            })
        }
    })
})
router.post('/info', jsonParser, (req, res) => {
    console.log(req.user)
    console.log(req.user.username)
    console.log(req.body.id)
    gooddao.findOne({
        _id: req.body.id,
    }, limit = {}).then((result) => {
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

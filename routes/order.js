var express = require('express');
const OrderDao = require('../models/dao/orderDao');
const GoodDao = require('../models/dao/goodDao');
var bodyParser = require('body-parser');
const UserDao = require('../models/dao/userDao');
// create application/json parser
var jsonParser = bodyParser.json()
var router = express.Router();
var orderdao = new OrderDao()
var gooddao = new GoodDao()
var userdao = new UserDao()
router.post('/create', jsonParser, (req, res) => {
    let params = req.body
    params.owner = req.user.username
    const goodId = params.id
    gooddao.findOne({
        _id: goodId
    }, limit = {
        _id: 0
    }).then((result) => {
        console.dir('findOne gooddao --> ', result)
        if (result) {
            var data = JSON.stringify(result)
            var finalData = JSON.parse(data)
            var order = {
                ...finalData,
                cover: finalData.images[0],
                goodId: goodId,
                num: params.num,
                owner: params.owner
            }
            orderdao.save(order).then((fin) => {
                console.log(fin)
                if (fin) {
                    res.json({
                        code: 20000,
                        data: fin,
                        message: "创建成功!!"
                    })
                } else {
                    res.json({
                        code: 50000,
                        data: {},
                        message: "创建失败!!"
                    })
                }
            })
        } else {
            res.json({
                code: 50000,
                data: {},
                message: "Good ins't exist"
            })
        }
    })
})

router.post('/info', jsonParser, (req, res) => {
    console.log(req.user)
    console.log(req.user.username)
    console.log(req.body.id)
    orderdao.findOne({
        _id: req.body.id,
        owner: req.user.username
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
router.post('/list', jsonParser, (req, res) => {
    console.log(req.user.username)
    orderdao.findAll({
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
router.post("/pay", jsonParser, (req, res) => {
    console.log(req.user)
    console.log(req.user.username)
    const order = req.body
    userdao.findOne({
        username: req.user.username
    }, limit = {
        _id: 0
    }).then((result) => {
        console.dir('findOne userdao --> ', result)
        if (result) {
            var data = JSON.stringify(result)
            var finalData = JSON.parse(data)
            var remain = finalData.remain
            console.log(remain, order.finalPrice)
            if (remain >= order.finalPrice) {
                remain = remain - order.finalPrice
                orderdao.findOne({
                    _id: order._id
                }).then(result => {
                    if (result) {
                        var data = JSON.stringify(result)
                        var orderData = JSON.parse(data)
                        if (orderData.state == 'created' && order.payway == "remain") {
                            console.log(req.user.username, order._id)
                            var usr = req.user.username
                            var userP = userdao.updateOne({
                                username: usr
                            }, {
                                "$set": { "remain": remain }
                            }).then(res => {
                                console.log(res)
                            })
                            var orderP = orderdao.updateOne({
                                _id: order._id
                            }, {
                                "$set": { "state": "finished" }
                            })
                            let proms = [userP, orderP]
                            Promise.all(proms).then(fin => {
                                console.log(fin)
                                res.json({
                                    code: 20000,
                                    data: fin,
                                    message: "支付成功"
                                })
                            })
                        } else {
                            res.json({
                                code: 50000,
                                data: {},
                                message: "订单错误"
                            })
                        }
                    }
                })

            } else {
                res.json({
                    code: 50000,
                    data: {},
                    message: "余额不足，请充值"
                })
            }


        } else {
            res.json({
                code: 50000,
                data: {},
                message: "支付异常，请联系客服"
            })
        }
    })
})
module.exports = router;
var express = require('express');
const Basket = require('../models/basket')
const BaksetDao = require('../models/dao/basketDao');
const sign = require('../utils/jwt')
var bodyParser = require('body-parser');
const GoodDao = require('../models/dao/goodDao');
// create application/json parser
var jsonParser = bodyParser.json()
var router = express.Router();
var basketdao = new BaksetDao()
var gooddao = new GoodDao()

router.post('/addCart', jsonParser, (req, res) => {
    let params = req.body
    params.createTime = new Date()
    params.owner = req.user.username
    let result = basketdao.save(params)
    if (result) {
        res.json({
            code: 20000,
            data: {},
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
router.post('/update', jsonParser, (req, res) => {
    let params = req.body
    console.log(params)
    let username = req.user.username
    userdao.updateOne({
        username: username
    }, {
        '$set': params
    }).then((result) => {
        console.log('update dao --> ', result)
        if (result) {
            userdao.findOne({
                username: username
            }, limit = {
                password: 0,
                _id: 0
            }).then(result => {
                res.json({
                    code: 20000,
                    data: result,
                    message: "update successfully."
                })
            })

        } else {
            res.json({
                code: 50000,
                data: {},
                message: "unknow error."
            })
        }
    });
})



router.post('/list', jsonParser, (req, res) => {
    console.log(req.user)
    console.log(req.user.username)
    basketdao.findAll({
        owner: req.user.username
    }).then((result) => {
        console.log('findAll asdasdasdao --> ', result)
        var data = JSON.stringify(result)
        data = JSON.parse(data)
        const list = {}
        for (let item of data) {
            if (list[item.goodId]) {
                list[item.goodId]['items'].push(item)
            } else {
                list[item.goodId] = {}
                list[item.goodId]['items'] = []
                list[item.goodId]['items'].push(item)
            }
        }
        var keys = Object.keys(list)
        var promises = []
        keys.forEach(elem => {
            var promise = gooddao.findOne({
                _id: elem
            })
            promises.push(promise)
        })
        Promise.all(promises).then(result => {
            result.forEach((element, index) => {
                list[keys[index]]['good'] = element
            })
            console.log(list)
            if (result) {
                res.json({
                    code: 20000,
                    data: list,
                    message: "Get user infomation successfully"
                })
            } else {
                res.json({
                    code: 50000,
                    data: {},
                    message: "User ins't exist"
                })
            }
        })

    });
})

module.exports = router;
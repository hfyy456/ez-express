var express = require('express');
const Order = require('../models/order')
const OrderDao = require('../models/dao/orderDao');
const GoodDao = require('../models/dao/goodDao');
const sign = require('../utils/jwt')
var bodyParser = require('body-parser')
// create application/json parser
var jsonParser = bodyParser.json()
var router = express.Router();
var orderdao = new OrderDao()
var gooddao = new GoodDao()
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
        num: params.num
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


module.exports = router;
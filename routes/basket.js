var express = require('express');
const User = require('../models/user')
const BaksetDao = require('../models/dao/basketDao');
const sign = require('../utils/jwt')
var bodyParser = require('body-parser')
// create application/json parser
var jsonParser = bodyParser.json()
var router = express.Router();
var basketdao = new BaksetDao()
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



router.post('/info', jsonParser, (req, res) => {
  console.log(req.user)
  console.log(req.user.username)
  userdao.findOne({
    username: req.user.username
  }, limit = {
    password: 0,
    _id: 0
  }).then((result) => {
    console.log('findOne asdasdasdao --> ', result)
    if (result) {
      res.json({
        code: 20000,
        data: result,
        message: "Get user infomation successfully"
      })
    } else {
      res.json({
        code: 50000,
        data: {},
        message: "User ins't exist"
      })
    }
  });
})

module.exports = router;
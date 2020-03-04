var express = require('express');
const User = require('../models/user')
const UserDao = require('../models/dao/userdao');
var bodyParser = require('body-parser')
// create application/json parser
var jsonParser = bodyParser.json()
var router = express.Router();
var userdao = new UserDao()
router.post('/login',jsonParser, (req, res) => {
  console.log(req.body)
  let username = req.body.username // 前端请求头用json发送的话用 req.query 或者 req.params
  console.log(username)
  //接收不到就下载一个y插件来解析
  let password = req.body.password
  userdao.findOne({ username: username }).then((result) => {
      console.log('findOne dao --> ', result) 
      if (result) {
          console.log('密码为:' + result.password)
          if (password == result.password) {
              res.send('登陆成功')//登录成功，返回token
          } else {
              res.send('密码错误')
          }
      } else {
          res.send('账号不存在')
      }
  });
})
module.exports = router;

var express = require('express');
var qiniu = require('qiniu');
const Image = require('../models/image')
const ImageDao = require('../models/dao/imageDao');
var bodyParser = require('body-parser')
// create application/json parser
var jsonParser = bodyParser.json()
var router = express.Router();
var imagedao = new ImageDao()
const config = {
    "AccessKey": "UHrDwmx3MQz4n0FJTt3FEClfzPAPPFy1YTh9ojKW",
    "SecretKey": "nwRM-P33icU0SYzlCxU9GGuJoH_fBhKIi0p7tqJT",
    "Bucket": "nuxtblog",
    "Domain": "http://qiniu.hfsblog.com/",
    "UptokenUrl": "uptoken"
}
var mac = new qiniu.auth.digest.Mac(config.AccessKey, config.SecretKey);
var putExtra = new qiniu.form_up.PutExtra();
var options = {
    scope: config.Bucket,
    returnBody: '{"key":"$(key)","hash":"$(etag)","fsize":$(fsize),"bucket":"$(bucket)","name":"$(x:name)"}'
}
var putPolicy = new qiniu.rs.PutPolicy(options);
var bucketManager = new qiniu.rs.BucketManager(mac, config);
router.post('/uploadToken', jsonParser, (req, res) => {
    var token = putPolicy.uploadToken(mac);
    res.header("Cache-Control", "max-age=0, private, must-revalidate")
    res.header("Pragma", "no-cache")
    res.header("Expires", 0)
    if (token) {
        res.json({
            code: 20000,
            data: {},
            message: "创建成功!!"
        })

    }
})
router.post('/create', jsonParser, (req, res) => {
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

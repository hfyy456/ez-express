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
var options = {
    scope: config.Bucket,
    returnBody: '{"key":"$(key)","hash":"$(etag)","fsize":$(fsize),"bucket":"$(bucket)","name":"$(x:name)"}'
}
var putPolicy = new qiniu.rs.PutPolicy(options);
router.post('/uploadToken', jsonParser, (req, res) => {
    console.log('sss')
    var token = putPolicy.uploadToken(mac);
    console.log(token)
    res.header("Cache-Control", "max-age=0, private, must-revalidate")
    res.header("Pragma", "no-cache")
    res.header("Expires", 0)
    if (token) {
        res.json({
            code: 20000,
            data: token,
            message: "Created successfully!!"
        })

    } else {
        res.json({
            code: 5000
        })
    }
})
router.post('/create', jsonParser, (req, res) => {
    const username = req.user.username
    const list = req.body.list
    let promises = []
    console.log(username)
    for (const item of list) {
        let param = { url: item, author: username }
        let promise = imagedao.save(param)
        promises.push(promise)
    }
    Promise.all(promises).then(res => {
        res.json({
            code: 20000,
            data: {},
            message: "ALL created successfully!!"
        })
    }).catch(e => {
        res.json({
            code: 50000,
            data: {},
            message: "created failed!!"
        })
    })

})
module.exports = router;

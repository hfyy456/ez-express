var express = require('express');
const Article = require('../models/article')
const ArticleDao = require('../models/dao/articleDao');
var bodyParser = require('body-parser')
// create application/json parser
var jsonParser = bodyParser.json()
var router = express.Router();
var articledao = new ArticleDao()
router.post('/create', jsonParser, (req, res) => {
    let params = req.body
    params.createTime = new Date()
    let result = articledao.save(params)
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
router.post('/list', jsonParser, (req, res) => {
    let pageSize = req.body.pageSize
    let pageNum = req.body.pageNum
    articledao.findAllByPage(pageSize, pageNum, limit = {
        content: 0,
    }).then((results) => {
        if (results) {
            res.json({
                code: 20000,
                data: results,
                message: "获取成功!!"
            })
        } else {
            res.json({
                code: 50000,
                data: {},
                message: "获取失败!!"
            })
        }
    })
})
router.post('/item', jsonParser, (req, res) => {
    let _id = req.body.id
    articledao.findOne({
        "_id": _id
    }).then((results) => {
        if (results) {
            res.json({
                code: 20000,
                data: results,
                message: "获取成功!!"
            })
        } else {
            res.json({
                code: 50000,
                data: {},
                message: "获取失败!!"
            })
        }
    })
})
module.exports = router;
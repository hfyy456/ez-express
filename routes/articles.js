var express = require('express');
const Article = require('../models/article')
const ArticleDao = require('../models/dao/articleDao');
var bodyParser = require('body-parser')
// create application/json parser
var jsonParser = bodyParser.json()
var router = express.Router();
var articledao = new ArticleDao()
router.post('/create', jsonParser, (req, res) => {
    let article = new Article()
    article.content=req.body.content
    article.title=req.body.title
    article.subtitle=req.body.subtitle
    article.image=req.body.image
    article.original=req.body.original
    article.oUrl=req.body.oUrl
    article.blog=req.body.blog
    article.preview=req.body.preview
    article.author=req.body.author
    let dateTime= new Date()
    article.createTime= dateTime.toLocaleString()
    let result=articledao.save(article)
    if(result) {
        res.json({
            code: 20000,
            data: {},
            message: "创建成功!!"
        })
    }else {
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
    articledao.findAllByPage(pageSize,pageNum).then((results) => {
        if(results) {
            res.json({
                code: 20000,
                data:results,
                message: "获取成功!!"
            })
        }else {
            res.json({
                code: 50000,
                data: {},
                message: "获取失败!!"
            })
        }
    })
})
router.get('/:id', jsonParser, (req, res) => {
    let _id = req.params.id
    articledao.findOne({"_id":_id}).then((results) => {
        if(results) {
            res.json({
                code: 20000,
                data:results,
                message: "获取成功!!"
            })
        }else {
            res.json({
                code: 50000,
                data: {},
                message: "获取失败!!"
            })
        }
    })
})
module.exports = router;

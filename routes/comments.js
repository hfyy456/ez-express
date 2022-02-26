var express = require("express")
const Comment = require("../models/comment")
const CommentDao = require("../models/dao/commentDao")
var bodyParser = require("body-parser")
// create application/json parser
var jsonParser = bodyParser.json()
var router = express.Router()
var commentdao = new CommentDao()
router.post("/create", jsonParser, (req, res) => {
    let params = req.body
    console.log(params)
    params.createTime = new Date()
    let result = commentdao.save(params)
    if (result) {
        res.json({
            code: 20000,
            data: {},
            message: "创建成功!!",
        })
    } else {
        res.json({
            code: 50000,
            data: {},
            message: "创建失败!!",
        })
    }
})
router.post("/list", jsonParser, (req, res) => {
    console.log(req.body.id)
    commentdao
        .findAll({
            aid: req.body.id,
        })
        .then((result) => {
            if (result) {
                res.json({
                    code: 20000,
                    data: result,
                    message: "查询成功",
                })
            } else {
                res.json({
                    code: 50000,
                    data: result,
                    message: "查询失败",
                })
            }
        })
})
module.exports = router

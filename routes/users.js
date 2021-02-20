var express = require('express');
const User = require('../models/user')
const UserDao = require('../models/dao/userDao');
const sign = require('../utils/jwt')
var bodyParser = require('body-parser')
// create application/json parser
var jsonParser = bodyParser.json()
var router = express.Router();
var userdao = new UserDao()
router.post('/login', jsonParser, (req, res) => {
    console.log(req.body)
    let params = req.body
    userdao.findOne(params, limit = { password: 0, _id: 0 }).then((result) => {
        console.log('findOne dao --> ', result)
        if (result) {
            let data = result
            res.json({
                code: 20000,
                data: data,
                token: sign(data.username),
                message: "login successfully"
            })

        } else {
            res.json({
                code: 50000,
                data: {},
                message: "username or password isn't correct"
            })
        }

    })
})

router.post('/regist', jsonParser, (req, res) => {
    let params = req.body
    console.log(params)
    userdao.save(params).then((result) => {
        console.log('Save dao --> ', result)
        if (result) {
            userdao.findOne(result, limit = { password: 0, _id: 0 }).then(result => {
                res.json({
                    code: 20000,
                    data: result,
                    token: sign(result.username),
                    message: "regist successfully."
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
router.post('/email', jsonParser, (req, res) => {
    let params = req.body
    let email = params.email
    userdao.findOne({ email: email }).then((result) => {
        console.log('findOne dao --> ', result)
        if (!result) {
            res.json({
                code: 20000,
                data: {},
                message: "Email didn't exist."
            })
        } else {
            res.json({
                code: 50000,
                data: {},
                message: "Email has already exist."
            })
        }
    });
})
router.post('/info', jsonParser, (req, res) => {
    console.log(req.user)
    console.log(req.user.username)
    userdao.findOne({ username: req.user.username }, limit = { password: 0, _id: 0 }).then((result) => {
        console.log('findOne asdasdasdao --> ', result)
        if (result) {
            res.json({
                code: 20000,
                data: result,
                message: "Get user infomation successfull"
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
router.post('/username', jsonParser, (req, res) => {
    let params = req.body
    let username = params.username
    userdao.findOne({ username: username }).then((result) => {
        console.log('findOne dao --> ', result)
        if (!result) {
            res.json({
                code: 20000,
                data: {},
                message: "Username didn't exist."
            })
        } else {
            res.json({
                code: 50000,
                data: {},
                message: "Username has already exist."
            })
        }
    });
})
module.exports = router;

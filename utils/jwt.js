const jwt = require("jsonwebtoken");
var config = require('../configs/config')
module.exports = function (username) {
    const secret = config.jwt.secret
    const algorithms = config.jwt.algorithms[0]
    const token = 'Bearer' + ' ' + jwt.sign({
        username: username, // 自定义字段
        expiresIn: 1800,
    }, secret, { algorithm: algorithms })
    console.log(token)
    return token
}
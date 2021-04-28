let { Schema } = require('mongoose');
let { mongoClient } = require('../configs/mongodb/index');

const adminSchema = new Schema({
    username: String,
    hasRoom: Boolean,
    living: Boolean,
    cover: String,
    desc: String,
    createTime: {
        type: Date,
        default: new Date()
    },
}, {
    versionKey: false,
    runSettersOnQuery: true // 查询时是否执行 setters
})
let Store = mongoClient.model(`Admin`, adminSchema, 'admin');

module.exports = Store
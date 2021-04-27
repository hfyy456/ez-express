let { Schema } = require('mongoose');
let { mongoClient } = require('../configs/mongodb/index');

const orderSchema = new Schema({
    name: String,
    price: Number,
    goodId: String,
    cover: String,
    desc: String,
    num: Number,
    owner: String,
    type: String,
    voucherId: String,
    state: {
        type: String,
        default: "created",
    },
    createTime: {
        type: Date,
        default: new Date()
    },
}, {
    versionKey: false,
    runSettersOnQuery: true // 查询时是否执行 setters
})
let Order = mongoClient.model(`Order`, orderSchema, 'order');

module.exports = Order
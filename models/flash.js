let { Schema } = require('mongoose');
let { mongoClient } = require('../configs/mongodb/index');

const flashSaleSchema = new Schema({
    name: String,
    price: Number,
    goodId: String,
    cover: String,
    inventory: Number,
    owner: String,
    endTime:String,
    adminId:String,
    createTime: {
        type: Date,
        default: new Date()
    },
}, {
    versionKey: false,
    runSettersOnQuery: true // 查询时是否执行 setters
})
let FlashSale = mongoClient.model(`FlashSale`, flashSaleSchema, 'flashSale');

module.exports = FlashSale
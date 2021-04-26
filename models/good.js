let { Schema } = require('mongoose');
let { mongoClient } = require('../configs/mongodb/index');

const goodSchema = new Schema({
  name: String,
  price: Number,
  goodId: String,
  cover: String,
  desc: String,
  num: Number,
  owner: String,
  createTime: {
    type: Date,
    default: new Date()
  },
},
  {
    versionKey: false,
    runSettersOnQuery: true // 查询时是否执行 setters
  }
)
let Good = mongoClient.model(`Good`, goodSchema, 'good');

module.exports = Good
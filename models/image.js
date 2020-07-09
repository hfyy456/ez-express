let { Schema } = require('mongoose');
let { mongoClient } = require('../configs/mongodb/index');
const imageSchema = new Schema({
  url: String,
  createTime: {
    type: Date,
    default: new Date()
  },
  author: String
},
  {
    versionKey: false,
    runSettersOnQuery: true // 查询时是否执行 setters
  }
)
let Image = mongoClient.model(`Image`, imageSchema, 'image');

module.exports = Image
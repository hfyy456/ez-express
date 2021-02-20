let {
  Schema
} = require('mongoose');
let {
  mongoClient
} = require('../configs/mongodb/index');

const articleSchema = new Schema({
  status: String,
  content: String,
  title: String,
  author: String,
  summary: String,
  createTime: {
    type: Date,
    default: new Date()
  },
  categories: {
    type:Array,
    default:[],
  },
  commentCount: {
    default: 0,
    type: Number
  },
  editTime: {
    type: Date,
    default: new Date()
  },
  fullPath: String,
  thumbnail: String,
  visits: {
    default: 0,
    type: Number
  },
  priority: {
    default:0,
    type:Number
  },
}, {
  runSettersOnQuery: true // 查询时是否执行 setters
})
let Article = mongoClient.model(`Article`, articleSchema, 'article');

module.exports = Article
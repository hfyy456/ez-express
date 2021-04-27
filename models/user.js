let { Schema } = require('mongoose');
let { mongoClient } = require('../configs/mongodb/index');

const userSchema = new Schema({
  username: String,
  password: String,
  email: String,
  remain: Number,
  active: {
    type: Boolean,
    default: false
  },
  createTime: {
    type: Date,
    default: new Date()
  },
  avatar: {
    type: String,
    default: 'http://qiniu.hfsblog.com/default.jpg'
  },
  nickname: {
    type: String,
    default: 'unknow'
  },
  location: {
    type: String,
    default: 'Hangzhou,Zhejiang'
  },
},
  {
    versionKey: false,
    runSettersOnQuery: true // 查询时是否执行 setters
  }
)
let User = mongoClient.model(`User`, userSchema, 'user');

module.exports = User
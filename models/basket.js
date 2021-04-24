let { Schema } = require('mongoose');
let { mongoClient } = require('../configs/mongodb/index');

const basketSchema = new Schema({
  owner: String,
  goodId: String,
  num: String,
},
  {
    versionKey: false,
    runSettersOnQuery: true // 查询时是否执行 setters
  }
)
let Basket = mongoClient.model(`Basket`, basketSchema, 'basket');

module.exports = Basket
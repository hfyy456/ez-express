let { Schema } = require("mongoose")
let { mongoClient } = require("../configs/mongodb/index")

const commentSchema = new Schema(
    {
        status: String,
        content: String,
        nickname: String,
        avatar: String,
        aid: String,
        pid: String,
        os: String,
        url: String,
        createTime: {
            type: Date,
            default: new Date(),
        },
        priority: {
            default: 0,
            type: Number,
        },
    },
    {
        runSettersOnQuery: true, // 查询时是否执行 setters
    }
)
let Comment = mongoClient.model(`Comment`, commentSchema, "comment")

module.exports = Comment

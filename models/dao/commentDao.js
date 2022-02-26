const BaseDao = require("./baseDao")
const Comment = require("../comment")

class CommentDao extends BaseDao {
    constructor() {
        super(Comment)
    }
}
module.exports = CommentDao

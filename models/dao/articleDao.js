const BaseDao = require('./baseDao')
const Article = require('../article')

class ArticleDao extends BaseDao {
    constructor() {
        super(Article)
    }
}
module.exports = ArticleDao;
const BaseDao = require('./baseDao')
const Good = require('../good')

class GoodDao extends BaseDao {
    constructor() {
        super(Good)
    }
}
module.exports = GoodDao
const BaseDao = require('./baseDao')
const Store = require('../store')

class StoreDao extends BaseDao {
    constructor() {
        super(Store)
    }
}
module.exports = StoreDao
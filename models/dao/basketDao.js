const BaseDao = require('./baseDao')
const Basket = require('../basket')

class BasketDao extends BaseDao {
    constructor() {
        super(Basket)
    }
}
module.exports = BasketDao
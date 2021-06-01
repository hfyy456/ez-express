const BaseDao = require('./baseDao')
const FlashSale = require('../flash')

class FlashSaleDao extends BaseDao {
    constructor() {
        super(FlashSale)
    }
}
module.exports = FlashSaleDao
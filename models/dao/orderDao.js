const BaseDao = require('./baseDao')
const Order = require('../order')

class OrderDao extends BaseDao {
    constructor() {
        super(Order)
    }
}
module.exports = OrderDao
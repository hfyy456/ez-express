const BaseDao = require('./baseDao')
const User = require('../user')

class UserDao extends BaseDao {
    constructor() {
        super(User)
    }
}
module.exports = UserDao
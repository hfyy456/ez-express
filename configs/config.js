module.exports = {
  "mongodb": {
    "user": "root",
    "pass": "root",
    "host": "101.132.154.213",
    "port": "32323",
    "db": "epitome"
  },
  "jwt": {
    algorithms: ["HS256"],
    secret: 'key',
    whiteList: ['/api/user/login', '/api/user/regist', '/api/user/email', '/api/user/username', '/profile', '/api/article/list', '/api/article/create', '/api/article/item']
  }
}
module.exports = {
  "mongodb": {
    "user": "root",
    "pass": "root",
    "host": "49.235.123.41",
    "port": "32323",
    "db": "epitome"
  },
  "jwt": {
    algorithms: ["HS256"],
    secret: 'key',
    whiteList: ['api/chat/echo','/api/user/login', '/api/user/regist', '/api/user/email', '/api/user/username', '/profile', '/api/article/list', '/api/article/create', '/api/article/item']
  }
}
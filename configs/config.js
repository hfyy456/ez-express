module.exports = {
    mongodb: {
        user: "root",
        pass: "root",
        host: "106.12.117.164",
        port: "32323",
        db: "blog",
    },
    jwt: {
        algorithms: ["HS256"],
        secret: "key",
        whiteList: [
            "api/chat/echo",
            "/api/user/login",
            "/api/user/regist",
            "/api/user/email",
            "/api/user/username",
            "/profile",
            "/api/article/list",
            "/api/article/create",
            "/api/article/item",
            "/api/comment/create",
            "/api/comment/list",
        ],
    },
}

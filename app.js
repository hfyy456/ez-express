var createError = require("http-errors")
var config = require("./configs/config")
var express = require("express")

var app = express()
var path = require("path")
var cookieParser = require("cookie-parser")
var logger = require("morgan")
var expressJWT = require("express-jwt")
var indexRouter = require("./routes/index")
var usersRouter = require("./routes/users")
var articlesRouter = require("./routes/articles")
var commentsRouter = require("./routes/comments")

var imagesRouter = require("./routes/images")
var basketRouter = require("./routes/basket")
var orderRouter = require("./routes/order")
var goodRouter = require("./routes/good")
var storeRouter = require("./routes/store")

app.all("*", function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    //Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
    res.header("Access-Control-Allow-Headers", "*")
    res.header("Access-Control-Allow-Methods", "*")
    res.header("Content-Type", "application/json;charset=utf-8")
    next()
})
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "pug")

app.use(
    expressJWT({
        secret: config.jwt.secret,
        algorithms: config.jwt.algorithms,
    }).unless({
        path: config.jwt.whiteList, //除了这个地址，其他的URL都需要验证
    })
)
app.use(logger("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, "public")))
app.use("/", indexRouter)
app.use("/api/user", usersRouter)
app.use("/api/article", articlesRouter)
app.use("/api/image", imagesRouter)
app.use("/api/basket", basketRouter)
app.use("/api/order", orderRouter)
app.use("/api/good", goodRouter)
app.use("/api/store", storeRouter)
app.use("/api/comment", commentsRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
    if (err.name === "UnauthorizedError") {
        res.status(401).send("invalid token")
    }
})
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message
    res.locals.error = req.app.get("env") === "development" ? err : {}
    // render the error page
    res.status(err.status || 500)
    res.render("error")
})

module.exports = app

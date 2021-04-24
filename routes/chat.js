var express = require('express');
var router = express.Router();
function formatMsg(type, data) {
  var obj = {
    type: type,
    data: data
  }
  JSON.stringify(obj)
  return JSON.stringify(obj)

}
router.post('/ni', function (res, req) {
  console.log(res)
})
router.ws('/echo', function (ws, req) {


  ws.on('open', function () {

  });

  ws.on('message', function (msg) {
    ws.send(formatMsg('common', msg));
    var i = 0
    setInterval(() => {
      var obj = { user: 'nick', content: i++ }
      ws.send(formatMsg('message', obj));
    }, 1000)
  });
  ws.onerror = (error) => {
    console.log(error);
  }

});

module.exports = router;
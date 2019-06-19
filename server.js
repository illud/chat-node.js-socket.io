const app = require("express")()
const bpdyParser = require("body-parser")
const cors = require("cors")
var http = require('http').createServer(app);
var io = require('socket.io')(http);

var array = [];

io.on('connection', function (socket) {
  io.emit("users", { users: array })
  socket.on('disconnect', function () {

  });

  socket.on("logout", function (msg) {
    console.log(msg.token)
    for (var i = array.length - 1; i >= 0; i--) {
      if (array[i] === msg.token) {
        array.splice(i, 1);
      }
    }

    console.log(array)
  })

  socket.on("user", function (msg) {
    array.push(msg.token)
    console.log(array)
  })

  socket.on('usert_one', function (msg) {
    io.emit(msg.token_id, { message: msg.message })
  });


});



app.get("/", (req, res) => {
  res.sendFile(__dirname + '/index.html');
})


http.listen(3000, (err, req) => {

})
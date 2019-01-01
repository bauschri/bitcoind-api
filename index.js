const express = require('express')
const http = require('http')
const socketIO = require('socket.io')
const port = 4001
const config = require('./config');
const app = express();
const server = http.createServer(app)
const io = socketIO(server)


const db = require('./models').initializeDB(config);

//require('./worker/index')({io})
require('./models/resources')({ app, config, db });

app.get('/test',function(req,res) {
  io.sockets.emit('change color','triggered');
  res.status(200).json({})
});

io.on('connection', socket => {
  console.log('User connected', socket.id)

  socket.on('disconnect', () => {
    console.log('user disconnected')
  })
})

server.listen(port, () => console.log(`Listening on port ${port}`))

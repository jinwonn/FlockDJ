const server = require('http').createServer()
const io = require('socket.io')(server)

const RoomManager = require('./RoomManager')
const handleGetRooms = require('./handlers')
const roomManager = RoomManager()

io.on('connection', function (client) {

  console.log('client.id connected:', client.id)

  client.on('rooms', function () {
    console.log('getting rooms')
    handleGetRooms()
  })

  client.on('disconnect', function () {
    console.log('client.id disconnected:', client.id)
  })

  client.on('error', function (err) {
    console.log('received error from client:', client.id)
    console.log(err)
  })
})

server.listen(3000, function (err) {
  if (err) throw err
  console.log('listening on port 3000')
})

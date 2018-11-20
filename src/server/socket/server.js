const server = require('http').createServer()
const io = require('socket.io')(server)

const ClientManager = require('./ClientManager')
const RoomManager = require('./RoomManager')

const clientManager = ClientManager()
const roomManager = RoomManager()

io.on('connection', function (client) {

  console.log('client.id connected:', client.id)
  clientManager.addClient(client)

  client.on('join', Join)

  client.on('leave', Leave)

  client.on('rooms', GetRooms)

  client.on('disconnect', function () {
    console.log('client.id disconnected:', client.id)
    handleDisconnect()
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

function Join (room) {
  room.addUser(client)
  console.log("added", client)
}

function Leave (room) {
  room.removeUser("removed", client.id)
}

function GetRooms(_, callback) {
  return callback(null, roomManager.serializeRooms())
}
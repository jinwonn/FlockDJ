const server = require('http').createServer()
const io = require('socket.io')(server)

const ClientManager = require('./ClientManager')
const RoomManager = require('./RoomManager')
const makeHandlers = require('./handlers')

const clientManager = ClientManager()
const roomManager = RoomManager()

io.on('connection', function (client) {
  const {
    handleJoin,
    handleLeave,
    handleGetRooms,
    handleDisconnect
  } = makeHandlers(client, clientManager, roomManager)

  console.log('client.id connected:', client.id)
  clientManager.addClient(client)

  client.on('join', handleJoin)

  client.on('leave', handleLeave)

  client.on('rooms', handleGetRooms)

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

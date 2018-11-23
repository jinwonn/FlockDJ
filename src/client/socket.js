const io = require('socket.io-client')

export default function () {

  const socket = io.connect('http://localhost:3000')

  function registerHandler(onMessageReceived) {
    socket.on('message', onMessageReceived)
  }

  function unregisterHandler() {
    socket.off('message')
  }

  socket.on('error', function (err) {
    console.log('received socket error:')
    console.log(err)
  })

  function register(name, cb) {
    socket.emit('register', name, cb)
  }

  function join(roomName, cb) {
    socket.emit('join', roomName, cb)
    console.log("emit join to", roomName)
  }

  function leave(roomName, cb) {
    console.log("emit leave from", roomName)
    socket.emit('leave', roomName, cb)
  }

  function message(roomName, msg, cb) {
    console.log("emit message:", msg, "in room", roomName)
    socket.emit('message', { roomName, message: msg }, cb)
  }

  function getRooms(cb) {
    console.log("emitting getrooms to server")
    socket.emit('rooms', null, cb)
  }

  function getAvailableUsers(cb) {
    socket.emit('availableUsers', null, cb)
  }

  function queueUpdate(queueArr, cb) {
    console.log(queueArr);
    socket.emit('QUEUE_UPDATE', JSON.stringify(queueArr));
  }

  return {
    getRooms,
    register,
    join,
    leave,
    message,
    getAvailableUsers,
    registerHandler,
    unregisterHandler,
    queueUpdate
  }
}
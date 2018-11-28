const io = require('socket.io-client')

export default function () {

  const socket = io.connect('http://172.46.0.193:3000')

  function messageHandler(onMessageReceived) {
    socket.on('message', onMessageReceived)
  }

  function playHandler(play_Song) {
    socket.on('PLAY_SONG', play_Song)
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

  function join(roomName, username, cb) {
    socket.emit('join', roomName, username, cb)
    console.log(username, "emit join to", roomName)
  }

  function leave(roomName, cb) {
    console.log("emit leave from", roomName)
    socket.emit('leave', roomName, cb)
  }

  function message(roomName, username, message, created_at, cb) {
    console.log("emit message:", message, "in room", roomName)
    socket.emit('message', { roomName, username, message, created_at }, cb)
  }

  function getRooms(cb) {
    console.log("emitting getrooms to server")
    socket.emit('rooms', null, cb)
  }

  function getAvailableUsers(cb) {
    socket.emit('availableUsers', null, cb)
  }

  function queueUpdate(roomName, username, queueArr) {
    console.log("parsing:", queueArr)
    const queue = JSON.stringify(queueArr);
    console.log("emitting to", roomName, "the parsed queue", queue);
    const message =  { roomName, username, queue }
    console.log("emitting message", message)
    socket.emit('QUEUE_UPDATE', { roomName, username, queue } );
  }

  function emitReady(roomName) {
    console.log("room emit ready with roomName:", roomName)
    socket.emit('READY', roomName);
  }

  function createRoom(roomName, username, email){
    console.log('created', roomName)
    socket.emit('createRoom', roomName, username, email)
  }

  return {
    messageHandler,
    getRooms,
    register,
    join,
    leave,
    message,
    getAvailableUsers,
    playHandler,
    unregisterHandler,
    queueUpdate,
    emitReady,
    createRoom
  }
}


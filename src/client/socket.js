const io = require('socket.io-client')

export default function () {

  const socket = io.connect('http://localhost:3000')

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

  function queueUpdate(roomName, queueArr) {
    console.log("parsing:", queueArr)
    const queue = JSON.stringify(queueArr);
    console.log("emitting to", roomName, "the parsed queue", queue);
    const message =  { roomName, queue }
    console.log("emitting message", message)
    socket.emit('QUEUE_UPDATE', { roomName, queue } );
  }

  function emitReady(roomName) {
    console.log("room emit ready with roomName:", roomName)
    socket.emit('READY', roomName);
  }

  function createRoom(roomName, creator){
    console.log('created', roomName, 'room')
    socket.emit('createRoom',{roomName, creator})
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
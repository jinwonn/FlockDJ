const io = require('socket.io-client')

export default function () {
  
  const socket = io.connect('http://localhost:3000')

  socket.on('error', function (err) {
    console.log('received socket error:')
    console.log(err)
  })

  function join(roomName, cb) {
    socket.emit('join', roomName, cb)
  }

  function leave(roomName, cb) {
    socket.emit('leave', roomName, cb)
  }

  function getRooms(cb) {
    socket.emit('rooms', null, cb)
  }
}


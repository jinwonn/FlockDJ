const server = require('http').createServer()
const io = require('socket.io')(server)

io.on('connection', function (client) {

  console.log('client connected...', client.id)


  client.on('disconnect', function () {
    console.log('client disconnect...', client.id)
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
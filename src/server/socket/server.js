const server = require('http').createServer();
const io = require('socket.io')(server);

const ClientManager = require('./ClientManager');
const RoomManager = require('./RoomManager');
const makeHandlers = require('./handlers');

const clientManager = ClientManager();
const roomManager = RoomManager();

io.on('connection', (client) => {
  const {
    handleJoin,
    handleLeave,
    handleMessage,
    handleGetRooms,
    handleDisconnect,
    handleReady,
    handleQueueUpdate,
    handleCreateRoom
  } = makeHandlers(client, clientManager, roomManager);

  clientManager.addClient(client);

  client.on('READY', handleReady);

  client.on('QUEUE_UPDATE', handleQueueUpdate);

  client.on('join', handleJoin);

  client.on('leave', handleLeave);

  client.on('message', handleMessage);

  client.on('createRoom', handleCreateRoom);

  client.on('rooms', handleGetRooms);


  client.on('disconnect', () => {
    console.log('client.id disconnected:', client.id);
    handleDisconnect();
  });

  client.on('error', (err) => {
    console.log('received error from client:', client.id);
    console.log(err);
  });
});

server.listen(3000, (err) => {
  if (err) throw err;
  console.log('listening on port 3000');
});

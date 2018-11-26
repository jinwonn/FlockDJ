const RoomManager = require('./RoomManager')

const roomManager = RoomManager()

function ensureValidRoom(roomName) {
  const room = roomManager.getRoomByName(roomName);
  // console.log("ensure valid room result:", room)
  // console.log('ensureValidRoom received', roomName);
  // return Promise.all([
  //   room])
  //   .then(([room]) => Promise.resolve({ room }));
  return room; 
}

function makeHandleEvent() {

  function handleEvent(roomName, createEntry) {
    // console.log('handling event for', roomName)
    const user = 'test user'
    const room = ensureValidRoom(roomName)
    // console.log("handleevent gets this from ensure room", room)
    const entry = { user, ...createEntry() };
    room.addEntry(entry)
    // console.log('entry from handle function', entry)
    room.broadcastMessage({ chat: roomName, ...entry })
    return room;
  }

  return handleEvent;
}

module.exports = (client, clientManager, roomManager) => {
  const handleEvent = makeHandleEvent(client, clientManager, roomManager);

  function handleJoin(roomName, callback) {
    console.log('handling join to', roomName);
    const createEntry = () => ({ event: `joined ${roomName}` });
    console.log('entry to send:', createEntry);

    const room = handleEvent(roomName, createEntry)
    room.addUser(client);
    callback(null);
  }

  function handleLeave(roomName, callback) {
    const createEntry = () => ({ event: `left ${roomName}` });
    const room = handleEvent(roomName, createEntry)
    room.removeUser(client.id);
    callback(null);
  }

  function handleMessage({ roomName, message } = {}, callback) {
    const createEntry = () => ({ message });
    console.log('message recieved:', message)
    handleEvent(roomName, createEntry)
  }

  function handleGetRooms(_, callback) {
    return callback(null, roomManager.serializeRooms());
  }

  function handleDisconnect() {
    clientManager.removeClient(client);
    roomManager.removeClient(client);
  }

  function handleReady(roomName) {
    const room = ensureValidRoom(roomName);
    room.broadcastSong();
  }

  function handleQueueUpdate({ roomName, queue } = {}) {
    console.log('handle queue update for room:', roomName);
    console.log('thequeue to be handled is:', queue);
    const room = ensureValidRoom(roomName)
    console.log("queueArray: ", queue)
    const ParsedQueueArray = JSON.parse(queue);
    console.log("ParsedQA:", ParsedQueueArray)
    room.queue(ParsedQueueArray);
  }

  return {
    handleJoin,
    handleLeave,
    handleMessage,
    handleGetRooms,
    handleDisconnect,
    handleReady,
    handleQueueUpdate
  };
};

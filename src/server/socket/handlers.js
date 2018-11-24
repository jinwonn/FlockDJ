const RoomManager = require('./RoomManager')
const roomManager = RoomManager()

function ensureValidRoom(roomName) {
  const room = roomManager.getRoomByName(roomName)
  console.log("ensureValidRoom received", roomName)
  return Promise.all([
    room])
    .then(([room]) => Promise.resolve({ room }))
}

function makeHandleEvent() {

  function handleEvent(roomName, createEntry) {
    console.log("handling event for", roomName)
    const user = "test user"
    return ensureValidRoom(roomName)
      // .then(function ({ room, user }) {
      .then(function ({ room }) {
        const entry = { user, ...createEntry() }
        console.log("entry", entry)
        // console.log("room",room)
        room.addEntry(entry)
        console.log("entry from handle function", entry)
        room.broadcastMessage({ chat: roomName, ...entry })
        return room
      })
  }

  return handleEvent;
}

module.exports = function (client, clientManager, roomManager) {
  const handleEvent = makeHandleEvent(client, clientManager, roomManager)

  function handleRegister(userName, callback) {
    const user = "username"
    clientManager.registerClient(client, user)

    return callback(null, user)
  }

  function handleJoin(roomName, callback) {
    console.log("handling join to", roomName)
    const createEntry = () => ({ event: `joined ${roomName}` })
    console.log("entry to send:", createEntry)

    handleEvent(roomName, createEntry)
      .then(function (room) {
        room.addUser(client)
        callback(room.getChatHistory())
      })
      .catch(callback)
  }

  function handleLeave(roomName, callback) {
    const createEntry = () => ({ event: `left ${roomName}` })

    handleEvent(roomName, createEntry)
      .then(function (room) {
        room.removeUser(client.id)
        callback(null)
      })
      .catch(callback)
  }

  function handleMessage({ roomName, message } = {}, callback) {
    const createEntry = () => ({ message })
    console.log("message recieved")
    handleEvent(roomName, createEntry)
      .then(() => callback(null))
      .catch(callback)
  }

  function handleGetRooms(_, callback) {
    return callback(null, roomManager.serializeRooms())
  }

  function handleDisconnect() {
    clientManager.removeClient(client)
    roomManager.removeClient(client)
  }

  function handleReady(roomName) {
    return ensureValidRoom(roomName)
      .then(function ({ room }) {
        room.broadcastSong()
      });
  }

  return {
    handleRegister,
    handleJoin,
    handleLeave,
    handleMessage,
    handleGetRooms,
    handleDisconnect,
    handleReady
  }
}

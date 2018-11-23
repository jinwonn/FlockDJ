function makeHandleEvent(client, clientManager, roomManager) {
  // function ensureExists(getter, rejectionMessage) {
  //   return new Promise(function (resolve, reject) {
  //     const res = getter()
  //     return res
  //       ? resolve(res)
  //       : reject(rejectionMessage)
  //   })
  // }

  function ensureValidRoom(roomName) {
    const user = "test user"
    const room = roomManager.getRoomByName(roomName)
    console.log("ensureValidRoom received", roomName)
    return Promise.all([
      // ((roomName) => {
      //   return ensureExists(
      //   () => roomManager.getRoomByName(roomName),
      //   `invalid room name: ${roomName}`
      // )})
    room , user])
      .then(([room, user]) => Promise.resolve({ room, user }))
  }

  function handleEvent(roomName, createEntry) {
    console.log("handling event for", roomName)
    return ensureValidRoom(roomName)
      .then(function ({ room, user }) {
        const entry = { user, ...createEntry() }
        console.log("entry", entry)
        // console.log("room",room)
        room.addEntry(entry)
        console.log("entry from handle function", entry)
        room.broadcastMessage({ chat: roomName, ...entry })
        return room
      })
  }

  return handleEvent
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
        // console.log("room:",room)
        room.addUser(client)
        // console.log("room:",room)
        // callback(null, room.getChatHistory())
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

  return {
    handleRegister,
    handleJoin,
    handleLeave,
    handleMessage,
    handleGetRooms,
    handleDisconnect
  }
}

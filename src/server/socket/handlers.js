function makeHandleEvent(client, clientManager, roomManager) {
  function ensureExists(getter, rejectionMessage) {
    return new Promise(function (resolve, reject) {
      const res = getter()
      return res
        ? resolve(res)
        : reject(rejectionMessage)
    })
  }

  function ensureValidRoom(roomName) {
    room = roomManager.getRoomByName(roomName)
    return room
  }

  function handleEvent(roomName, createEntry) {
    console.log("handling event:", createEntry, ". for room: ", roomName)
    const user = "username"
    const room = ensureValidRoom(roomName)
    const entry = { user, ...createEntry() }
    const messageforBroadcast = { chat: roomName, ...entry }
    room.addEntry(entry)
    console.log("msg fr brdcst", messageforBroadcast)
    room.broadcastMessage(messageforBroadcast)
    return room 
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
    const room = roomManager.getRoomByName(roomName)
    // console.log("room:",room)
    room.addUser(client)
    // console.log("room:",room)
    room.getChatHistory()
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

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
    return Promise.all([
      ensureExists(
        () => roomManager.getRoomByName(roomName),
        `invalid room name: ${roomName}`
      )
    ])
      .then(([room, user]) => Promise.resolve({ room, user }))
  }

  function handleEvent(roomName) {
  // function handleEvent(roomName, createEntry) {
    return ensureValidRoom(roomName)
      .then(function ({ room }) {
      // .then(function ({ room, user }) {
        // // append event to room history
        // const entry = { user, ...createEntry() }
        // room.addEntry(entry)

        // // notify other clients in room
        // room.broadcastMessage({ chat: roomName, ...entry })
        // console.log("handling event", room)
        return room
      })
  }

  return handleEvent
}

module.exports = function (client, clientManager, roomManager) {
  const handleEvent = makeHandleEvent(client, clientManager, roomManager)

  function handleJoin(roomName, callback) {
    const createEntry = () => ({ event: `joined ${roomName}` })

    handleEvent(roomName, createEntry)
      .then(function (room) {
        room.addUser(client)
        callback(null, room.getChatHistory())
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

  function handleGetRooms(_, callback) {
    return callback(null, roomManager.serializeRooms())
  }

  function handleDisconnect() {
    clientManager.removeClient(client)
    roomManager.removeClient(client)
  }

  return {
    handleJoin,
    handleLeave,
    handleGetRooms,
    handleDisconnect
  }
}

const Room = require('./Room')
const Rooms = require('./models/rooms')

module.exports = function () {
  const rooms = new Map(
    Rooms.map(c => [
      c.name,
      Room(c)
    ])
  )

  function removeClient(client) {
    rooms.forEach(c => c.removeUser(client))
  }

  function getRoomByName(roomName) {
    return rooms.get(roomName)
  }

  function serializeRooms() {
    console.log("rooms from models", rooms.values())
    return Array.from(rooms.values()).map(c => c.serialize())
  }

  return {
    removeClient,
    getRoomByName,
    serializeRooms
  }
}

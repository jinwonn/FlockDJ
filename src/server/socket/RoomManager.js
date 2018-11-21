const Room = require('./Room')
const Rooms = require('./models/rooms')

module.exports = function () {
  const rooms = new Map(
    Rooms.map(c => [
      c.name,
      Room(c)
    ])
  )

  function serializeRooms() {
    console.log("rooms from models", Rooms)
    return Array.from(rooms.values()).map(c => c.serialize())
  }

  return {
    serializeRooms
  }
}

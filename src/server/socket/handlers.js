module.exports = function (client) {
  const serializeRooms = require('./RoomManager')
  
  function handleGetRooms(_, callback) {
    return callback(null, serializeRooms())
  }

  return {
    handleGetRooms
  }
}

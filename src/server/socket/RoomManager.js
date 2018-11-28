const Room = require('./Room');

module.exports = () => {
  let rooms = new Map();

  function removeClient(client) {
    rooms.forEach(c => c.removeUser(client));
  }

  function roomAdd(roomData) {
    rooms = rooms.set(roomData.name, Room(roomData));
    console.log(rooms);
  }

  function getRoomByName(roomName) {
    return rooms.get(roomName);
  }

  function serializeRooms() {
    return Array.from(rooms.values()).map(c => c.serialize());
  }

  return {
    removeClient,
    getRoomByName,
    serializeRooms,
    roomAdd
  };
};

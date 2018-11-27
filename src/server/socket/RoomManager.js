const Room = require('./Room');
const Rooms = require('./models/rooms');

module.exports = () => {
  let rooms = new Map(
    Rooms.map(c => [
      c.name,
      Room(c)
    ])
  )

  function roomAdd(roomData){
    console.log("adding new room to rooms array");
    Rooms.push(roomData);
    console.log(Rooms);
      rooms = new Map(
        Rooms.map(c => [
          c.name,
          Room(c)
        ])
      )
  }

  function removeClient(client) {
    rooms.forEach(c => c.removeUser(client));
  }

  function getRoomByName(roomName) {
    console.log('getRoomByName from roommanager finding:', roomName);
    rooms = new Map(
        Rooms.map(c => [
          c.name,
          Room(c)
        ])
      )
    return rooms.get(roomName);
  }

  function serializeRooms() {
    console.log('serializing rooms');
    return Array.from(rooms.values()).map(c => c.serialize());
  }

  return {
    removeClient,
    getRoomByName,
    serializeRooms,
    roomAdd
  }
}

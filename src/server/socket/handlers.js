module.exports = (client, clientManager, roomManager) => {
  function makeHandleEvent() {
    function handleEvent(roomName, username, createEntry) {
      const user = username;
      const room = roomManager.getRoomByName(roomName);
      const entry = { user, ...createEntry() };
      room.addEntry(entry);
      room.broadcastMessage({ chat: roomName, ...entry });
      return room;
    }
    return handleEvent;
  }

  const handleEvent = makeHandleEvent(client, clientManager, roomManager);

  function handleJoin(roomName, username) {
    const createEntry = () => ({ event: `joined ${roomName}` });
    const room = handleEvent(roomName, username, createEntry);
    room.addUser(client);
  }

  function handleLeave(roomName, callback) {
    const createEntry = () => ({ event: `left ${roomName}` });
    const room = handleEvent(roomName, createEntry);
    room.removeUser(client.id);
    callback(null);
  }

  function handleMessage({ roomName, username, message, created_at } = {}) {
    const createEntry = () => ({ message, created_at });
    handleEvent(roomName, username, createEntry);
  }

  function handleGetRooms(_, callback) {
    return callback(null, roomManager.serializeRooms());
  }

  function handleDisconnect() {
    clientManager.removeClient(client);
    roomManager.removeClient(client);
  }

  function handleReady(roomName) {
    const room = roomManager.getRoomByName(roomName);
    room.broadcastSong();
  }

  function handleQueueUpdate({ roomName, queue } = {}) {
    const room = roomManager.getRoomByName(roomName);
    const ParsedQueueArray = JSON.parse(queue);
    room.queue(ParsedQueueArray);
  }

  function handleCreateRoom(roomName, username, email) {
    const roomData = {
      name: roomName,
      username: username,
      email: email
    };
    console.log ("roomData name ", roomData.name)
    roomManager.roomAdd(roomData);
  }

  return {
    handleJoin,
    handleLeave,
    handleMessage,
    handleGetRooms,
    handleDisconnect,
    handleReady,
    handleQueueUpdate,
    handleCreateRoom,
    makeHandleEvent
  };
};

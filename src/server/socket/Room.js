module.exports = function ({ name }) {
  const members = new Map()
  let chatHistory = []
  let name = name
  let usersConnected = 0
  let roomqueue = null
  let staged = null
  let playing = null

  function broadcastMessage(message) {
    console.log("broadcasting: (", message, ") to members")
    members.forEach(m => m.emit('message', message))

  }

  function queue(newQueue) {
    if (newQueue) {
      roomqueue = newQueue;
      // if nothing is playing, run the `play` function (otherwise, the play function should
      // already be running, and will roll with the new queue).
      if (!playing && !staged) play();
    }
  }

  function stageNext() {
    staged = roomqueue.shift();
  }

  function play() {

    /*
      All of the actual song playing happens on the client side. `play` simply sends socket
      messages when the next song should be played/staged.
    */

    if (!staged) stageNext();
    if (!playing) {
      playing = Object.assign({startTime: Date.now()}, staged);
      members.forEach(m => m.emit('PLAY_SONG', JSON.stringify(playing)))
      staged = null;
      const timeToLastThirtySecondsOfSong = playing.duration_ms - 30000;

      setTimeout(() => {

        stageNext();
        setTimeout(() => {
          playing = null;
          if (staged) play();
        }, 30000);

      }, timeToLastThirtySecondsOfSong);
    }
  }

  function addEntry(entry) {
    console.log("adding entry", entry)
    chatHistory = chatHistory.concat(entry)
    console.log("chat histtory:", chatHistory)
  }

  function getChatHistory() {
    console.log("getting chat history, got:", chatHistory.slice())
    return chatHistory.slice()
  }

  function addUser(client) {
    // console.log("adding", client.id, "to room.", "# of members of room:", members.size)
    members.set(client.id, client)
    console.log("addUser(client). now # of members of room:", members.size)
  }

  function removeUser(client) {
    // console.log("removing user from room:", client.id)
    members.delete(client.id)
  }

  function serialize() {
    return {
      name,
      numberofMembers: members.size
    }
  }


  return {
    broadcastMessage,
    addEntry,
    getChatHistory,
    addUser,
    removeUser,
    serialize,
    queue
  }
}

module.exports = ({ name }) => {
  const members = new Map();
  let chatHistory = [];
  // let name = name
  let history = [];
  let repeat = true;
  let usersConnected = 0;
  let roomqueue = null;
  let staged = null;
  let playing = null;

  // ========== Room Functions ==========
  
  function addUser(client) {
    members.set(client.id, client);
  }

  function removeUser(client) {
    members.delete(client.id);
  }

  function serialize() {
    return {
      name,
      numberofMembers: members.size
    };
  }

  // ========== Chat Functions ==========

  function broadcastMessage(message) {
    console.log('broadcasting: (', message, ') to members');
    members.forEach(m => m.emit('message', message));
  }

  function addEntry(entry) {
    chatHistory = chatHistory.concat(entry);
  }

  function getChatHistory() {
    console.log('getting chat history, got:', chatHistory.slice());
    return chatHistory.slice();
  }

  // ========== Spotify Functions ==========

  function broadcastSong() {
    console.log('broadcasting to play : (', playing, ') to members');
    members.forEach(m => m.emit('PLAY_SONG', JSON.stringify(playing)));
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
      history.push(staged);
      playing = Object.assign({startTime: Date.now()}, staged);
      members.forEach(m => m.emit('PLAY_SONG', JSON.stringify(playing)));
      console.log("emitting play to all members")
      staged = null;
      const timeToLastThirtySecondsOfSong = playing.duration_ms - 30000;

      setTimeout(() => {
        stageNext();
        setTimeout(() => {
          playing = null;
          if (!staged && repeat === true) {
            queue(history);
          }
          else if (staged) play();
        }, 30000);
      }, timeToLastThirtySecondsOfSong);
    }
  }

  function queue(newQueue) {
    if (newQueue) {
      roomqueue = newQueue;
      history = [];
      // if nothing is playing, run the `play` function (otherwise, the play function should
      // already be running, and will roll with the new queue).
      if (!playing && !staged) play();
    }
  }


  return {
    broadcastMessage,
    addEntry,
    getChatHistory,
    addUser,
    removeUser,
    serialize,
    queue,
    broadcastSong
  };
};

const server = require('http').createServer();
const io = require('socket.io')(server);


io.on('connection', (client) => {

console.log('connected to socket')


io.on('playlist_update' ,(playlistTracks) => {

  //We're creating a room on the server side?!?
  class Room {

    constructor(roomId) {
      this.ID = roomId;
    }

    createQueue() {
      this.queue = playlistTracks
    };

    stageSong() {
      this.staged = queue.unshift();
    };

    currentSong() {

      if(!staged) {
        throw 'Please provide a playlist'
      }

      this.playing = {
        songuri: 'test',
        startedAt: Date.now(),
        duration: 10000
      }

    };

    play() {

      if(!queue) {
        throw 'Please provide a playlist'
      }


    }
  }
});













}
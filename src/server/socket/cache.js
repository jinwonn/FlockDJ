/*

  Room(name, io)
  ==============

  @name {string} - should match the URL of the room (connnect.to/lofi_labs).
  @io   {object} - an instance of socket.io, so it can send messages.

  Usage
  -----

  The only interaction we need to have with a Room instance is through its `Room.queue`, which sets a new queue
  and starts 'playing' it (keeps track of time and notifies connected users when its time to play a new song).

  Room.queue(newQueue)
  @newQueue {array} - an array of objects. Each object should represent a song, and have the following
                      properties:

                      uri
                      duration_ms

*/

module.exports = class Room {
  constructor(name, io) {
    this.name = name;
    this.usersConnected = 0;
    this._queue = null;
    this.staged = null;
    this.playing = null;
    this.io = io;
  }

  set queue(newQueue) {
    if (newQueue) {
      this._queue = newQueue;
      // if nothing is playing, run the `play` function (otherwise, the play function should
      // already be running, and will roll with the new queue).
      if (!this.playing && !this.staged) this.play();
    }
  }

  stageNext() {
    this.staged = this._queue.shift();
  }

  play() {

    /*
      All of the actual song playing happens on the client side. `play` simply sends socket
      messages when the next song should be played/staged.
    */

    if (!this.staged) this.stageNext();
    if (!this.playing) {
      this.playing = Object.assign({startTime: Date.now()}, this.staged);
      this.io.to(this.name).emit('PLAY_SONG', JSON.stringify(this.playing));
      this.staged = null;
      const timeToLastThirtySecondsOfSong = this.playing.duration_ms - 30000;

      setTimeout(() => {

        this.stageNext();
        setTimeout(() => {
          this.playing = null;
          if (this.staged) this.play();
        }, 30000);

      }, timeToLastThirtySecondsOfSong);
    }
  }
}
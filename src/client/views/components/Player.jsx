import React, { Component } from 'react';
import socket from '../../socket';
import spotifyhelper from '../../assets/spotify-helper'

export default class Player extends Component{
  constructor(props) {
      super(props);
      this.state = {
        client: socket(),
        spotifyhelper: spotifyhelper()
    }
  }
// URI input feild and handling
  enterPlaylistUri = (event) => {
    let playlistUri;
    if(event.keyCode === 13){
      playlistUri = event.target.value;
    }
    this.state.spotifyhelper.generatePlaylistArray(playlistUri, this.state.client.queueUpdate)
  }

  render() {

    return (
     <div className='spotify-player'>
        <input className="queue-input" placeholder="Enter a playlist" onKeyUp={this.enterPlaylistUri}/>
     </div>
    );
  }
}
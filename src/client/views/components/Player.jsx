import React, { Component } from 'react';
import socket from '../../socket';

export default class Player extends Component{
  constructor(props) {
      super(props);
      this.state = {
        client: socket(),
    }
  }

  enterPlaylistUri = (e) => {
    let playlistUri;
    if(event.keyCode === 13){
      console.log('---------------')
      console.log('Enter pressed')
      console.log('---------------')
      playlistUri = e.target.value;
    }
    console.log(playlistUri);
    this.generatePlaylistArray(playlistUri, this.state.client.queueUpdate())
  }

  getTailOfURI = (uri) => {
    const pieces = uri.split(':');
    return pieces[pieces.length - 1];
  }

  generatePlaylistArray = (uri, cb) => {
    console.log('---------------')
    console.log(uri);
    console.log('---------------')
    fetch(`https://api.spotify.com/v1/playlists/${this.getTailOfURI(uri)}/tracks?fields=items(track.uri%2Ctrack.duration_ms)`,
      {
        method: "GET",
        headers: {
         "Authorization": "Bearer " + getCookie('access_token'),
         "Content-Type": "application/json"
        }
       }).then(res => res.json())
         .then((playlist) => {
          console.log('inside second promise')
            cb(playlist.items.map((e) => {console.log('Inside playlist map'); return e.track}))
          });
  }

  render() {

    return (
     <div className='spotify-player'>
        <input className="queue-input" placeholder="Enter a playlist" onKeyUp={this.enterPlaylistUri}/>
     </div>
    );
  }
}
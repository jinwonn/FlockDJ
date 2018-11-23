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

  enterPlaylistUri = (event) => {
    let playlistUri;
    if(event.keyCode === 13){
      playlistUri = event.target.value;
    }
    this.state.spotifyhelper.generatePlaylistArray(playlistUri, this.state.client.queueUpdate)
  }

  // getTailOfURI = (uri) => {
  //   const pieces = uri.split(':');
  //   return pieces[pieces.length - 1];
  // }

  // generatePlaylistArray = (uri, cb) => {
  //   fetch(`https://api.spotify.com/v1/playlists/${this.getTailOfURI(uri)}/tracks?fields=items(track.uri%2Ctrack.duration_ms)`,
  //     {
  //       method: "GET",
  //       headers: {
  //        "Authorization": "Bearer " + getCookie('access_token'),
  //        "Content-Type": "application/json"
  //       }
  //      }).then(res => res.json())
  //        .then((playlist) => {
  //           cb(playlist.items.map(trackObj => trackObj.track))
  //         })
  //        .catch((err) => {console.log('Error Mapping:', err)});
  // }


  //  play_Song(song) {
  //     const parsedSong = JSON.parse(song);
  //     if (parsedSong) playSong(parsedSong, deviceId);
  //  }




  render() {

    return (
     <div className='spotify-player'>
        <input className="queue-input" placeholder="Enter a playlist" onKeyUp={this.enterPlaylistUri}/>
     </div>
    );
  }
}
import React, { Component } from 'react';
import socket from '../../../socket';
import spotifyhelper from './spotify-helper';
import WebPlaybackReact from './WebPlaybackReact.jsx';
import NowPlaying from './NowPlaying.jsx';
import '../../../styles/room.css';

window.onSpotifyWebPlaybackSDKReady = () => {};

export default class Player extends Component {

  constructor(props) {
    super(props);
    this.state = {
      client: socket(),
      spotifyhelper: spotifyhelper(),
      roomname: this.props.room,
      ownerEmail: this.props.ownerEmail,

      // User's session credentials
      userDeviceId: null,
      userEmail: this.props.userEmail,
      username: this.props.username,

      // Player state
      playerLoaded: false,
      // playerSelected: false,
      playerState: null
    }
  }
  // URI input feild and handling
  enterPlaylistUri = (event) => {
    let playlistUri;
    let roomName = this.state.roomname
    let username = this.state.username
    if(event.keyCode === 13){
      playlistUri = event.target.value;
    }
    this.state.spotifyhelper.generatePlaylistArray(playlistUri, roomName, username, this.state.client.queueUpdate);
    event.target.value = "";
  }

  play_Song = (song) => {
    console.log("received song to play")
    const parsedSong = JSON.parse(song);
     if (parsedSong) {
       this.state.spotifyhelper.playSong(parsedSong, this.state.userDeviceId);
       this.state.spotifyhelper.checkToken();
     }
   }
 
   componentDidMount() {
     this.state.spotifyhelper.checkToken();
     console.log("Player.jsx room name:", this.state.roomname)
     console.log("useremail:", this.state.userEmail)
     console.log("owneremail", this.state.ownerEmail)
     this.props.playHandler(this.play_Song)
   }
 
   render() {
     let {
       userAccessToken,
       playerLoaded,
       playerState
     } = this.state;
 
     const webPlaybackSdkProps = {
       playerName: 'Spotify React Player',
       playerInitialVolume: 1.0,
       playerRefreshRateMs: 100,
       playerAutoConnect: true,
       roomName: this.state.roomname,
       onPlayerRequestAccessToken: (() => userAccessToken),
       onPlayerLoading: (() => this.setState({ playerLoaded: true })),
       onPlayerWaitingForDevice: (data => this.setState({ playerSelected: true, userDeviceId: data.device_id })),
       onPlayerStateChange: (playerState => this.setState({ playerState: playerState })),
       onPlayerError: (playerError => console.error(playerError))
     };
 
     return (
       <div className="spotify-player">
         <div>
           <WebPlaybackReact room={this.state.roomname} {...webPlaybackSdkProps}>
             {playerLoaded && playerState &&
               <NowPlaying playerState={playerState} />
             }
           </WebPlaybackReact>
         </div>
         { this.state.ownerEmail === this.state.userEmail ? (
         <input className="queue-input" placeholder="Enter a valid Spotify playlist URI to update room playlist" onKeyUp={this.enterPlaylistUri}/>
         ) : (<div />) }
       </div>
     );
   }
 }
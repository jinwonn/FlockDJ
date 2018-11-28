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
      
      // User's session credentials
      userDeviceId: null,

      // Player state
      playerLoaded: false,
      playerSelected: false,
      playerState: null
    }
  }
  // URI input feild and handling
  enterPlaylistUri = (event) => {
    let playlistUri;
    let roomName = this.state.roomname
    if(event.keyCode === 13){
      playlistUri = event.target.value;
    }
    this.state.spotifyhelper.generatePlaylistArray(playlistUri, roomName, this.state.client.queueUpdate)
  }

  play_Song = (song) => {
    console.log("received song to play")
    const parsedSong = JSON.parse(song);
    if (parsedSong) this.state.spotifyhelper.playSong(parsedSong, this.state.userDeviceId);
  }

  componentDidMount() {
    console.log("Player.jsx room name:", this.state.roomname)
    this.props.playHandler(this.play_Song)
  }

  render() {

    let {
      userAccessToken,
      playerLoaded,
      playerState
    } = this.state;

    let webPlaybackSdkProps = {
      playerName: "Spotify React Player",
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
        <input className="queue-input" placeholder="Enter a playlist" onKeyUp={this.enterPlaylistUri}/>
      </div>
    );
  }
}
import React, { Component } from 'react';
import socket from '../../socket';
import spotifyhelper from '../../assets/spotify-helper';
import WebPlaybackReact from '../../assets/player';

window.onSpotifyWebPlaybackSDKReady = () => {};

export default class Player extends Component {

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

    let {
      userAccessToken
    } = this.state;

    let webPlaybackSdkProps = {
      playerName: "Spotify React Player",
      playerInitialVolume: 1.0,
      playerRefreshRateMs: 100,
      playerAutoConnect: true,
      deviceId: null,
      onPlayerRequestAccessToken: (() => userAccessToken),
      onPlayerLoading: (() => this.setState({ playerLoaded: true })),
      onPlayerWaitingForDevice: (data => this.setState({ playerSelected: false, userDeviceId: data.device_id })),
      onPlayerDeviceSelected: (() => this.setState({ playerSelected: true })),
      onPlayerStateChange: (playerState => this.setState({ playerState: playerState })),
      onPlayerError: (playerError => console.error(playerError))
    };

    return (
      <div className="spotify-player">
        <div>
          <WebPlaybackReact {...webPlaybackSdkProps}/>
        </div>
        <div>
          <audio hidden>
            Your browser does not support the &lt;audio&gt; tag.
            <source src='https://www.computerhope.com/jargon/m/example.mp3' />
          </audio>
        </div>
        <input className="queue-input" placeholder="Enter a playlist" onKeyUp={this.enterPlaylistUri}/>
      </div>
    );
  }
}
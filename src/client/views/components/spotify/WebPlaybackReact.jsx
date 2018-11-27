import React, { Component, Fragment } from 'react';
import spotifyhelper from './spotify-helper';
import socket from '../../../socket';

const sh = spotifyhelper() 
const token = sh.getCookie('access_token');

export default class WebPlayback extends Component {
  constructor(props) {
    super(props);
    this.state = {
      client: socket(),
      roomname: this.props.room,
      playerReady: false,
      playerSelected: false
    };
  }

  deviceSelectedInterval = null
  statePollingInterval = null
  webPlaybackInstance = null

  async handleState(state) {
    if (state) {
      this.props.onPlayerStateChange(state);
    } else {
      let {
        _options: { id: device_id }
      } = this.webPlaybackInstance;

      this.clearStatePolling();
      this.props.onPlayerWaitingForDevice({ device_id: device_id });
      this.waitForDeviceToBeSelected();
      // this.props.onPlayerDeviceSelected();
    }
  }
  
  waitForSpotify() {
    return new Promise((resolve) => {
      if ('Spotify' in window) {
        resolve();
      } else {
        window.onSpotifyWebPlaybackSDKReady = () => { resolve(); };
      }
    });
  }

  waitForDeviceToBeSelected() {
    return new Promise(resolve => {
      this.deviceSelectedInterval = setInterval(() => {
        if (this.webPlaybackInstance) {
          this.webPlaybackInstance.getCurrentState().then(state => {
            if (state !== null) {
              this.startStatePolling();
              clearInterval(this.deviceSelectedInterval);
              resolve(state);
            }
          });
        }
      });
    });
  }

  startStatePolling() {
    this.statePollingInterval = setInterval(async () => {
      let state = await this.webPlaybackInstance.getCurrentState();
      await this.handleState(state);
    }, this.props.playerRefreshRateMs || 1000);
  }

  clearStatePolling() {
    clearInterval(this.statePollingInterval);
  }


  async setupWebPlaybackEvents() {
    const { Player } = window.Spotify;

    this.webPlaybackInstance = new Player({
      name: this.props.playerName,
      volume: this.props.playerInitialVolume,
      getOAuthToken: async (cb) => { cb(token); }
    });
    
    this.webPlaybackInstance.on('initialization_error', (e) => {
      this.props.onPlayerError(e.message);
    });
    
    this.webPlaybackInstance.on('authentication_error', (e) => {
      this.props.onPlayerError(e.message);
    });

    this.webPlaybackInstance.on('account_error', (e) => {
      this.props.onPlayerError(e.message);
    });

    this.webPlaybackInstance.on('playback_error', (e) => {
      this.props.onPlayerError(e.message);
    });

    this.webPlaybackInstance.on('player_state_changed', async state => {
      await this.handleState(state);
    });

    this.webPlaybackInstance.on('ready', () => {
      let roomName = this.state.roomname;
      this.state.client.emitReady(roomName);
      console.log('emitted ready from room:', roomName);
    });

    this.webPlaybackInstance.connect();
  }

  setupWaitingForDevice() {
    return new Promise(resolve => {
      this.webPlaybackInstance.on("ready", data => {
        resolve(data);
      });
    });
  }

  async componentWillMount() {
    console.log("webPlaybackSdkProps room name:", this.state.roomname)
    // Notify the player is loading
    this.props.onPlayerLoading();
    
    // Wait for Spotify to load player
    await this.waitForSpotify();
    
    // Setup the instance and the callbacks
    await this.setupWebPlaybackEvents();
    
    // Wait for device to be ready
    let device_data = await this.setupWaitingForDevice();
    this.props.onPlayerWaitingForDevice(device_data);

    // // Wait for device to be selected
    this.waitForDeviceToBeSelected();
    
  }
  render() {
    return (
      <Fragment>
        {this.props.children}
      </Fragment>
    );
  }
}

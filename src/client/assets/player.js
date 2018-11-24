let token = getCookie('access_token');

window.onSpotifyWebPlaybackSDKReady = () => {
  const player = new Spotify.Player({
    name: 'Connnect.to',
    getOAuthToken: cb => { cb(token); }
  });
 console.log("working")
  // error handling
  player.addListener('initialization_error', ({ message }) => { console.error(message); });
  player.addListener('authentication_error', ({ message }) => { console.error(message); });
  player.addListener('account_error', ({ message }) => { console.error(message); });
  player.addListener('playback_error', ({ message }) => { console.error(message); });

  // playback status updates
  player.addListener('player_state_changed', state => { console.log(state); });

  // ready
  player.addListener('ready', ({ device_id }) => {
    deviceId = device_id;
    console.log('Ready with Device ID', device_id);
    socket.emit('READY');
    console.log("emitted ready")
  });

  // not ready
  player.addListener('not_ready', ({ device_id }) => {
    console.log('Device ID has gone offline', device_id);
  });

  // connect
  player.connect();
};
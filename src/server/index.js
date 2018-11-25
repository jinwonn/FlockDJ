const express           = require('express');
const os                = require('os');
const app               = express();
const http              = require('http').Server(app);
const cookieParser      = require('cookie-parser')
const io                = require('socket.io')(http);
const SpotifyAPI        = require('spotify-web-api-node');
require('dotenv').config();
const clientId          = process.env.CLIENT_ID;
const clientSecret      = process.env.CLIENT_SECRET;
const redirectUri       = 'http://localhost:8080/callback';
const scopes            = ['user-read-private', 'user-read-email', 'user-modify-playback-state', 'streaming', 'user-read-birthdate'];
const spotify           = new SpotifyAPI({ clientId, clientSecret, redirectUri });


// app.use(express.static('public'));
app.use(cookieParser());

app.use(express.static('dist'));
app.get('/api/getUsername', (req, res) => res.send({ username: os.userInfo().username }));

app.get('/auth', (req, res) => {
  res.redirect(spotify.createAuthorizeURL(scopes));
});

/*
  SPOTIFY AUTH ROUTES
*/

app.get('/callback', (req, res) => {
  spotify.authorizationCodeGrant(req.query.code)
  .then((data) => {
    res.cookie('access_token', data.body['access_token']);
    res.cookie('refresh_token', data.body['refresh_token']);;
  },
  (err) => console.log('error:', err))
  .then(() => res.redirect('/main'));
});

app.get('/auth/refresh', (req, res) => {
  const refreshToken = req.cookies['refresh_token'];
  const spotifyRefresh = new SpotifyAPI({ clientId, clientSecret, redirectUri });
  spotifyRefresh.setRefreshToken(refreshToken);
  spotifyRefresh.refreshAccessToken().then((data) => {
    res.cookie('access_token', data.body['access_token']);
  },
  (err) => console.log('Could not refresh access token', err))
  .then(() => res.redirect('/'));
});

app.get('*',(req,res,next) => {
 res.sendFile('index.html',{root:'./dist/'})
});

/*
  =========
  SOCKET.IO
  =========
*/


// when a client first connects...
io.on('connection', (socket) => {
  socket.join('lofi_labs');

  // when a client is 'ready' (after the Spotify Connect player has been loaded)...
  socket.on('READY', () => {
    const currentRoom = Object.keys(socket.rooms)[1]
    // if a song is currently playing, send that song.
    if (state.rooms['lofi_labs'].playing) {
      io.to('lofi_labs').emit('PLAY_SONG', JSON.stringify(state.rooms[currentRoom].playing));
    }
  });

  // when a client submits a new queue...
  socket.on('QUEUE_UPDATE', (playlistArr) => {
    const currentRoom = Object.keys(socket.rooms)[1];
    // push that to the queue of the room that the client is connected to
    state.rooms[currentRoom].queue = JSON.parse(playlistArr);
  });

});

http.listen(8080, () => console.log('Listening on port 8080.'));

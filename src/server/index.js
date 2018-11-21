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


app.use(express.static('public'));
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
  SOCKET.IO
*/

io.on('connection', (socket) => {
  console.log('someone is here');

  socket.on('song', (song) => {
    io.emit('song', song);
  });
});

http.listen(8080, () => console.log('Listening on port 8080.'));

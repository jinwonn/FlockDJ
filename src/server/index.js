const express           = require('express');
const app               = express();
const http              = require('http').Server(app);
const cookieParser      = require('cookie-parser')
const io                = require('socket.io')(http);
const SpotifyAPI        = require('spotify-web-api-node');
require('dotenv').config();
const AWS               = require('aws-sdk');
const fs                = require('fs');
const fileType          = require('file-type');
const bluebird          = require('bluebird');
const multiparty        = require('multiparty');
const awsBucket         = process.env.AWS_BUCKET_NAME;
const awsId             = process.env.AWS_ACCESS_KEY_ID;
const awsSecret         = process.env.AWS_SECRET_ACCESS_KEY;
const clientId          = process.env.CLIENT_ID;
const clientSecret      = process.env.CLIENT_SECRET;
const redirectUri       = 'http://localhost:8080/callback';
const scopes            = ['user-read-private', 'user-read-email', 'user-modify-playback-state', 'streaming', 'user-read-birthdate'];
const spotify           = new SpotifyAPI({ clientId, clientSecret, redirectUri });


// app.use(express.static('public'));
app.use(cookieParser());

app.use(express.static('dist'));

app.get('/auth', (req, res) => {
  res.redirect(spotify.createAuthorizeURL(scopes));
});

/*
  ========================================
  AWS FILE UPLOAD ROUTES AND CONFIGURATION
  ========================================
*/

// configure the keys for accessing AWS
AWS.config.update({
  accessKeyId: awsId,
  secretAccessKey: awsSecret
});

// create S3 instance
const s3 = new AWS.S3();

// abstracts function to upload a file returning a promise
const uploadFile = (buffer, name, type) => {
  const params = {
    ACL: 'public-read',
    Body: buffer,
    Bucket: awsBucket,
    ContentType: type.mime,
    Key: `${name}.${type.ext}`
  };
  return s3.upload(params).promise();
};

// Define POST route
app.post('/test-upload', (request, response) => {
  const form = new multiparty.Form();
    form.parse(request, async (error, fields, files) => {
      if (error) throw new Error(error);
      try {
        const path = files.file[0].path;
        const buffer = fs.readFileSync(path);
        const type = fileType(buffer);
        const timestamp = Date.now().toString();
        const fileName = `bucketFolder/${timestamp}-lg`;
        const data = await uploadFile(buffer, fileName, type);
        return response.status(200).send(data);
      } catch (error) {
        return response.status(400).send(error);
      }
    });
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

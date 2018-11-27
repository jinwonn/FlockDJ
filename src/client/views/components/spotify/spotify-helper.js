
export default function () {

  function getCookie(name) {
    const value = "; " + document.cookie;
    const parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
  }

  function getTailOfURI(uri) {
    const pieces = uri.split(':');
    return pieces[pieces.length - 1];
  }

  /*

    generatePlaylistArray(uri, cb)
    ==============================

    @uri  {string}   - should be a spotify playlist uri copied directly form spotify
                       (example: spotify:user:landendanyluk:playlist:3hCn8UBhxjyVmmC1X9t1kC).
    @cb   {function} - a function to call after the data has been fetched.

  */

  function generatePlaylistArray(uri, roomName, cb) {
  // items(track.uri,track.duration_ms,track.album(images))

  fetch(`https://api.spotify.com/v1/playlists/${getTailOfURI(uri)}/tracks?fields=items(track.uri%2Ctrack.duration_ms%2Ctrack.album(images))`,
    {
      method: "GET",
      headers: {
       "Authorization": "Bearer " + getCookie('access_token'),
       "Content-Type": "application/json"
      }
     }).then(res => res.json())
       .then((response) => {
        const arrOfTracks = response.items.map(item => {
          const artwork = item.track.album.images[0].url;
          const duration_ms = item.track.duration_ms;
          const uri = item.track.uri;
          return {artwork, duration_ms, uri}
        });

          cb(roomName, arrOfTracks);
        });
}

function getSpotifyUserId(cb) {

  fetch(`https://api.spotify.com/v1/me`,
    {
      method: "GET",
      headers: {
       "Authorization": "Bearer " + getCookie('access_token'),
       "Content-Type": "application/json"
      }
     }).then(res => res.json())
       .then((response) => {
        const userId = response.display_name;
          cb(userId);
        });
}

  // function generatePlaylistArray(uri, roomName, cb) {
  //   fetch(`https://api.spotify.com/v1/playlists/${getTailOfURI(uri)}/tracks?fields=items(track.uri%2Ctrack.duration_ms)`,
  //     {
  //       method: "GET",
  //       headers: {
  //         "Authorization": "Bearer " + getCookie('access_token'),
  //         "Content-Type": "application/json"
  //       }
  //     }).then(res => res.json())
  //     .then((playlist) => {
  //       console.log(playlist);
  //       cb(roomName, playlist.items.map(trackObj => trackObj.track))
  //     })
  //     .catch((err) => {console.log('Error Mapping:', err)});
  // }

/*

  playSong(song)
  ==============================

  @song     {object}   - same song object that is passed into `staged` and `playing` in state.
  @deviceId {string}   - deviceID to play song on (set equal to the ID of the connnect.to Spotify Connect player).
  @cb       {function} - (optional) callback function with no arguments (for logging purposes).

*/

   function playSong(song, deviceId, cb = () => null) {
     console.log("playing song on player? (log locaiton s helper)")
    fetch(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`,
      {
        method: "PUT",
        body: JSON.stringify({"uris": [song.uri], "position_ms": Date.now() - song.startTime}),
        headers: {"Authorization": "Bearer " + getCookie('access_token'),
                "Content-Type": "application/json"}
    }).then( cb())
  }

  return {
    generatePlaylistArray,
    playSong,
    getCookie,
    getSpotifyUserId
  }
}


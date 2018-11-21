import React, { Component } from 'react';
import cookie from 'react-cookie';
import { BrowserRouter, Route, Switch, Link} from 'react-router-dom';

import '../styles/main.css';
import ReactImage from '../assets/react.png';
import Room from './Room.jsx';
import Navbar from './components/NavBar.jsx';

function getPlaylistTracks(PlaylistUri) {
    fetch(`https://api.spotify.com/v1/playlists/${PlaylistUri}/tracks?fields=items(track.uri%2Ctrack.duration_ms)`,
      {
        method: "GET",
        headers: {
          "Authorization": "Bearer " + cookie.load('access_token'),
          "Content-Type": "application/json"
        }
      }
    )
    .then(res => res.json())
    .then(
      (result) => {
        console.log(result);
      }
      // Note: it's important to handle errors here
      // instead of a catch() block so that we don't swallow
      // exceptions from actual bugs in components.
      // (error) => {
      //   socket.emit('error', error);
      // }
    )
}

export default class Main extends Component {
  constructor(props) {
    super(props);
    // this is the *only* time you should assign directly to state:
    this.state = {
      roomID: null,
      roomName: null,
      username: null,//This line can be entirely removed
      currentUser: {
        name: "Anonymous",
        color: "black"
      },//The current user will be stored here along with their random color
      songs: {
        staged: {
          songuri: 'songuriStringHere',
          duration: 327000
        },
        playing: {
          songuri: 'songuriStringHere',
          started_at: 'timeinUTC',
          duration: 247000
        }
      },
      messages: [],
      getPlaylistTracks: getPlaylistTracks,// messages coming from the server will be stored here as they arrive
    }
  }

  componentDidMount() {
    fetch('/api/getUsername')
      .then(res => res.json())
      .then(user => this.setState({ username: user.username }));
  }

  render() {
    const { username } = this.state;
    this.state.getPlaylistTracks('6C92HETt370wqh8DQ28Xx7');
    return (
      <div>
        <Navbar/>
        {username ? <h1>{`Hello ${username}`}</h1> : <h1>Loading.. please wait!</h1>}
      <BrowserRouter>
        <Switch>
          <Route exact path="/room" component={Room} />
          <Link to="/room"><button>Show the Room</button></Link>
        </Switch>
      </BrowserRouter>
      </div>
    );
  }
}

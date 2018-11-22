import React, { Component } from 'react';
import cookie from 'react-cookie';
import { BrowserRouter, Route, Switch, Link} from 'react-router-dom';

import '../styles/main.css';
import Room from './Room.jsx';
import Navbar from './components/NavBar.jsx';
import socket from '../socket';
import RoomsList from './components/RoomsList.jsx';

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

  constructor(props, context) {
    super(props, context)

    this.state = {
      username: "test",
      user: null,
      isRegisterInProcess: false,
      client: socket(),
      rooms: null,
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

    this.onEnterRoom = this.onEnterRoom.bind(this)
    this.onLeaveRoom = this.onLeaveRoom.bind(this)
    this.getRooms = this.getRooms.bind(this)
    this.register = this.register.bind(this)

    console.log('initial state:', this.state)
    this.getRooms();
  }

  onEnterRoom(roomName, onEnterSuccess) {
    console.log("entering room")
    return this.state.client.join(roomName, (err, chatHistory) => {
      if (err)
        return console.error(err)
      return onEnterSuccess(chatHistory)
    })
  }

  onLeaveRoom(roomName, onLeaveSuccess) {
    this.state.client.leave(roomName, (err) => {
      if (err)
        return console.error(err)
      return onLeaveSuccess()
    })
  }

  getRooms() {
    this.state.client.getRooms((err, rooms) => {
      this.setState({ rooms })
      console.log("state with rooms:", this.state)
    })
  }

  register(name) {
    const onRegisterResponse = user => this.setState({ isRegisterInProcess: false, user })
    this.setState({ isRegisterInProcess: true })
    this.state.client.register(name, (err, user) => {
      if (err) return onRegisterResponse(null)
      return onRegisterResponse(user)
    })
  }

  renderRoom(room, { history }) {
    const { chatHistory } = history.location.state

    return (
      <Room
        room={room}
        chatHistory={chatHistory}
        user={this.state.user}
        onLeave={
          () => this.onLeaveRoom(
            room.name,
            () => history.push('/')
          )
        }
        onSendMessage={
          (message, cb) => this.state.client.message(
            room.name,
            message,
            cb
          )
        }
        registerHandler={this.state.client.registerHandler}
        unregisterHandler={this.state.client.unregisterHandler}
      />
    )
  }

  render() {
    const { username } = this.state;
    this.state.getPlaylistTracks('6C92HETt370wqh8DQ28Xx7');
    return (
      <div>
        <Navbar/>
        <BrowserRouter>
        { !this.state.rooms ? (<div> wait.</div>)
                : (
          <Switch>
            <Route
              exact
              path="/"
              render={
                props => (
                  <RoomsList
                    user={this.state.user}
                    rooms={this.state.rooms}
                    // onChangeUser={() => props.history.push('/user')}
                    onEnterRoom={
                      roomName => this.onEnterRoom(
                        roomName,
                        // () => props.history.push('/user'),
                        chatHistory => props.history.push({
                          pathname: roomName,
                          state: { chatHistory }
                        })
                      )
                    }
                  />
                )
              }
            />
            <Route exact path={`/${this.state.username}`} component={Room} />
            <Link to={`/${this.state.username}`}><button>Show the Room lalala</button></Link>
            {
              this.state.rooms.map(room => (
                <Route
                  key={room.name}
                  exact
                  path={`/${room.name}`}
                  render={
                    props => this.renderRoom(room, props)
                  }
                />
              ))
            }
          </Switch>
                )
        }
        </BrowserRouter>
      </div>
    );
  }
}

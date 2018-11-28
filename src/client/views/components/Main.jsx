import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Link} from 'react-router-dom';

import '../../styles/main.css';
import Room from './Room.jsx';
import Navbar from './NavBar.jsx';
import socket from '../../socket';
import RoomsList from './rooms/RoomsList.jsx';
import spotifyhelper from './spotify/spotify-helper';

export default class Main extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      username: null,
      email: null,
      isRegisterInProcess: false,
      client: socket(),
      spotifyhelper: spotifyhelper()
    };

    this.onLeaveRoom = this.onLeaveRoom.bind(this);
    this.getRooms = this.getRooms.bind(this);

    console.log('initial state:', this.state);
    this.getRooms();
  }

  componentDidMount() {
    this.state.spotifyhelper.getSpotifyUserId(this.updateUserInfo)
  }

  onLeaveRoom(roomName, onLeaveSuccess) {
    this.state.client.leave(roomName, (err) => {
      if (err) return console.error(err);
      return onLeaveSuccess();
    })
  }

  getRooms() {
    this.state.client.getRooms((err, rooms) => {
      this.setState({ rooms })
      console.log("state with rooms:", this.state)
    })
  }

  updateUserInfo = (response) => {
    this.setState({ username: response.display_name });
    this.setState({ email: response.email });
    console.log("useremail",this.state.email)
  }

  renderRoom(room, { history }) {
    return (
      <Room
        room={room}
        roomname= {room.name}
        ownerEmail={room.email}
        username={this.state.username}
        userEmail={this.state.email}
        onLeave={
          () => this.onLeaveRoom(
            room.name,
            () => history.push('/')
          )
        }
      />
    );
  }

  render() {

    return (
      <div>
        <Navbar/>
        <BrowserRouter>
          { !this.state.rooms ? (<div> Loading... </div>): (
            <Switch>
              <Route
                exact
                path="/"
                render={
                  () => (
                    <RoomsList
                      rooms={this.state.rooms}
                      username={this.state.username}
                      email={this.state.email}
                    />
                  )
                }
              />
              {
                this.state.rooms.map(room => (
                  <Route
                    key={room.name}
                    exact
                    path={`/${room.name}`}
                    render={props => this.renderRoom(room, props)}
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

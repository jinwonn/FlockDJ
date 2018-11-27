import React, { Component } from 'react';
import cookie from 'react-cookie';
import { BrowserRouter, Route, Switch, Link} from 'react-router-dom';

import '../styles/main.css';
import Room from './Room.jsx';
import Navbar from './components/NavBar.jsx';
import socket from '../socket';
import RoomsList from './components/RoomsList.jsx';
import spotifyhelper from './components/spotify/spotify-helper';

export default class Main extends Component {
  constructor(props, context) {
    super(props, context)


    this.state = {
      username: null,
      user: "dan",
      isRegisterInProcess: false,
      client: socket(),
      spotifyhelper: spotifyhelper()
    };

    this.onLeaveRoom = this.onLeaveRoom.bind(this)
    this.getRooms = this.getRooms.bind(this)

    console.log('initial state:', this.state)
    this.getRooms();
  }

  async componentDidMount() {
    await this.state.spotifyhelper.getSpotifyUserId(this.updateUsername)
		await console.log("component", this.state.username)
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

  updateUsername = (entry) => {
    this.setState({ username: entry })
    console.log(entry)
    console.log(this.state.username)
  }


  renderRoom(room, { history }) {
    console.log("rendering room", room)

    return (
      <Room
        room={room}
        roomname= {room.name}
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
      />
    );
  }

  render() {

    return (
      <div>
        <Navbar/>
        <BrowserRouter user={this.state.user}>
          { !this.state.rooms ? (<div> wait.</div>): (
            <Switch>
              <Route
                exact
                path="/"
                render={
                  () => (
                    <RoomsList
                      user={this.state.user}
                      rooms={this.state.rooms}
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

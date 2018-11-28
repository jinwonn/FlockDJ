import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Link} from 'react-router-dom';
import { css } from 'react-emotion';
import { ClipLoader } from 'react-spinners';

import '../../styles/main.css';
import Room from './Room.jsx';
import Navbar from './NavBar.jsx';
import socket from '../../socket';
import RoomsList from './rooms/RoomsList.jsx';
import spotifyhelper from './spotify/spotify-helper';

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

    this.onLeaveRoom = this.onLeaveRoom.bind(this);
    this.getRooms = this.getRooms.bind(this);

    console.log('initial state:', this.state);
    this.getRooms();
  }

  async componentDidMount() {
    await this.state.spotifyhelper.getSpotifyUserId(this.updateUsername)
		await console.log("component", this.state.username)
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
        username={this.state.username}
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
          { !this.state.rooms ? (
            <div className='sweet-loading'>
              <ClipLoader
                className='loader-page'
                sizeUnit={"em"}
                size={10}
                color={'purple'}
                loading='true'
              />
            </div>
        ) : (
            <Switch>
              <Route
                exact
                path="/"
                render={
                  () => (
                    <RoomsList
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

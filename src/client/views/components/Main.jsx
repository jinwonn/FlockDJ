import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Link} from 'react-router-dom';
import { css } from 'react-emotion';
import Fade from '@material-ui/core/Fade';
import { ClipLoader } from 'react-spinners';

import '../../styles/main.css';
import Room from './Room.jsx';
import Navbar from './NavBar.jsx';
import socket from '../../socket';
import RoomsList from './rooms/RoomsList.jsx';
import spotifyhelper from './spotify/spotify-helper';
import Authenticate from './Authenticate.jsx'

export default class Main extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      username: null,
      email: null,
      isRegisterInProcess: false,
      client: socket(),
      spotifyhelper: spotifyhelper(),
      checked: true
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
    let { checked } = this.state;
    let page;

    const is_authenticated = this.state.username;
    if (is_authenticated) {
      page = <div>
        <Fade in={checked} style={{ transitionDelay: checked ? '150ms' : '0ms' }}>
          <div>
            <Navbar/>
          </div>
        </Fade>
        <BrowserRouter>
          { (!this.state.rooms || !this.state.email) ? (
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
          <Fade in={checked} style={{ transitionDelay: checked ? '250ms' : '0ms' }}>
            <div>
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
            </div>
          </Fade>
          )
        }
        </BrowserRouter>

      </div>
    } else {
      page = (
        <Fade in={checked} style={{ transitionDelay: checked ? '200ms' : '0ms' }}>
          <div>
          <Authenticate />
          </div>
        </Fade>
      )
    }
    return page;
  }
}

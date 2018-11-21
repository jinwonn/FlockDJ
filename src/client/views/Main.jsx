import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Link} from 'react-router-dom';

import '../styles/main.css';
import Room from './Room.jsx';
import Navbar from './components/NavBar.jsx';
import socket from '../socket';

export default class Main extends Component {
  constructor(props, context) {
    super(props, context)

    this.state = {
      username: "test",
      user: null,
      isRegisterInProcess: false,
      client: socket(),
      rooms: null
    }

    this.onEnterRoom = this.onEnterRoom.bind(this)
    this.onLeaveRoom = this.onLeaveRoom.bind(this)
    this.getRooms = this.getRooms.bind(this)
    this.register = this.register.bind(this)

    console.log('initial state:', this.state)
    this.getRooms();
  }

  onEnterRoom(roomName, onEnterSuccess) {
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
    return (
      <div>
        <Navbar/>
        {username ? <h1>{`Hello ${username}`}</h1> : <h1>Loading.. please wait!</h1>}
        <BrowserRouter>
          <Switch>
            <Route exact path={`/${this.state.username}`} component={Room} />
            <Link to={`/${this.state.username}`}><button>Show the Room</button></Link>
          </Switch>
        </BrowserRouter>
        <button type="submit" onClick={() => { this.onEnterRoom("Rock") }}>On Enter a room</button>
        <button type="submit" onClick={() => { this.onLeaveRoom("Rock") }}>On Leave a room</button>
      </div>
    );
  }
}

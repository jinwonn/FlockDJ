import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Link} from 'react-router-dom';

import '../styles/main.css';
import Room from './Room.jsx';
import socket from '../socket';

export default class Main extends Component {
  constructor(props, context) {
    super(props, context)

    this.state = {
      username: null,
      client: socket(),
      rooms: null
    }

    this.getRooms = this.getRooms.bind(this)

    console.log('initial state:', this.state)
    this.getRooms();

  }

  getRooms() {
    this.state.client.getRooms((err, rooms) => {
      this.setState({ rooms })
      console.log("state with rooms:", this.state)
    })
  }

  render() {
    return (
      <div>
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

import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Link} from 'react-router-dom';

import '../styles/main.css';
import ReactImage from '../assets/react.png';
import Room from './Room.jsx';

export default class Main extends Component {
  state = { username: null };

  componentDidMount() {
    fetch('/api/getUsername')
      .then(res => res.json())
      .then(user => this.setState({ username: user.username }));
  }

  render() {
    const { username } = this.state;
    return (
      <div>
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

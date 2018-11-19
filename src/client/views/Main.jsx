import React, { Component } from 'react';
import '../styles/main.css';
import ReactImage from '../assets/react.png';
import socket from '../socket';

export default class Main extends Component {
  constructor(props, context) {
    super(props, context)

    this.state = {
      username: null,
      client: socket()
    }
  }

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
        <img src={ReactImage} alt="react" />
      </div>
    );
  }
}

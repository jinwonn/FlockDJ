import React, { Component } from 'react';
import '../styles/room.css';
import Chat from './components/Chat.jsx'
export default class Room extends Component {
	constructor(props){
		super(props);
		this.state = {
			username: null
		}
	}

	componentDidMount() {
    fetch('/api/getUsername')
      .then(res => res.json())
      .then(user => this.setState({ username: user.username }));
  	}

  	

  render() {


    return (

      <div className= 'room'>
	      hello this is a room
	      <div className= 'chat-section'>
	      	Welcome to flock dj chat
	      	<Chat user={this.state.username}/>
	      </div>
      </div>
    );
  }
}
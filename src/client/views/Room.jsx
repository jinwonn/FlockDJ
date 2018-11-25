import React, { Component } from 'react';
import '../styles/room.css';
import Chat from './components/Chat.jsx'
import Player from './components/Player.jsx'
import spotifyhelper from '../assets/spotify-helper'

export default class Room extends Component {
  constructor(props, context) {
    super(props, context)

    const { chatHistory } = props			
    this.state = {
    // chatHistory, this is if you want to show previous chat history
      spotifyhelper: spotifyhelper(),
      chatHistory: [],
      username: null,
      roomname: this.props.roomname
    };
  }

  componentDidMount() {
    console.log("Room.jsx room name:", this.state.roomname)
    this.props.messageHandler(this.onMessageReceived)
		this.props.playHandler(this.state.spotifyhelper.play_Song)
		
		const script = document.createElement("script");
		script.src = 'https://sdk.scdn.co/spotify-player.js';
		script.src = 'src/client/assets/player.js';
		script.async = true;
		document.body.appendChild(script)

    fetch('/api/getUsername')
      .then(res => res.json())
      .then(user => this.setState({ username: user.username }));
  }

		onMessageReceived = (entry) => {
			console.log('onMessageReceived:', entry)
			this.updateChatHistory(entry)
		}

		updateChatHistory = (entry) => {
			this.setState({ chatHistory: this.state.chatHistory.concat(entry) })
		}

  render() {

    return (

      <div className= 'room'>
	      hello this is a room
				<div>{JSON.stringify(this.state)}</div>
	      <div className= 'chat-section'>
	      	Welcome to flock dj chat
	      	<Chat user={this.state.username} room={this.state.roomname} chatHistory={this.state.chatHistory}/>
	      </div>
        <div>
          <Player room={this.state.roomname} />
        </div>
      </div>
    );
  }
}
import React, { Component } from 'react';
import '../styles/room.css';
import Chat from './components/Chat.jsx'
import Player from './components/Player.jsx'
import socket from '../socket';

export default class Room extends Component {
  constructor(props, context) {
    super(props, context)

    // const { chatHistory } = props			
    this.state = {
    // chatHistory, this is if you want to show previous chat history
      chatHistory: [],
      username: null,
			roomname: this.props.roomname,
			client: socket()
    };
  }

  componentDidMount() {
    console.log("Room.jsx room name:", this.state.roomname)
    this.state.client.messageHandler(this.onMessageReceived)
		
		// const script = document.createElement("script");
		// script.src = 'https://sdk.scdn.co/spotify-player.js';
		// script.src = 'src/client/assets/player.js';
		// script.async = true;
		// document.body.appendChild(script)
		this.onEnterRoom(this.state.roomname)
    fetch('/api/getUsername')
      .then(res => res.json())
      .then(user => this.setState({ username: user.username }));
  }

	// onEnterRoom(roomName, onEnterSuccess) {
		onEnterRoom(roomName) {
    console.log("entering room", roomName)
		return this.state.client.join(roomName 
			// (err) => {
      // if (err)
      //   return console.error(err)
			// return
			//  onEnterSuccess()
		// }
		)
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
	    <div className= 'main'>
	    	<div className='left-container'>
	    	</div>
	    	<div className= 'center-container'>
	    		<div className='album-art-container'>
          	<Player room={this.state.roomname} playHandler={this.state.client.playHandler}/>
	    		</div>
	    		<footer className='bottom-container'>
	    			<p>Next Song: </p>
	    		</footer>
	    	</div>
	    </div> 
	      <div className= 'chat'>
	      	<Chat user={this.state.username} room={this.state.roomname} chatHistory={this.state.chatHistory}/>
	      </div>
        
      </div>
    );
  }
}
import React, { Component } from 'react';
import '../../styles/room.css';
import Chat from './chat/Chat.jsx'
import Player from './spotify/Player.jsx'
import socket from '../../socket';

export default class Room extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      chatHistory: [],
			roomname: this.props.roomname,
			client: socket(),
			username: 'Anonymous'
    };
  }

	componentWillMount() {
		if (this.props.username) {
			this.setState({ username: this.props.username })
		}
	}
	
  componentDidMount() {
    console.log("Room.jsx room name:", this.state.roomname)
    this.state.client.messageHandler(this.onMessageReceived)
		this.onEnterRoom(this.state.roomname, this.state.username)
  }

		onEnterRoom(roomName, username) {
			return this.state.client.join(roomName, username);
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
	      	<Chat username={this.state.username} room={this.state.roomname} chatHistory={this.state.chatHistory}/>
	      </div>

      </div>
    );
  }
}
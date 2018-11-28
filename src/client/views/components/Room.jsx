import React, { Component } from 'react';
import '../../styles/room.css';
import Fade from '@material-ui/core/Fade';
import Chat from './chat/Chat.jsx'
import Player from './spotify/Player.jsx'
import socket from '../../socket';

export default class Room extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      chatHistory: [],
			roomname: this.props.roomname,
			ownerEmail: this.props.ownerEmail,
			client: socket(),
			username: 'Anonymous',
			userEmail: this.props.userEmail,
			checked: true
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
		console.log("this room was made by:", this.state.ownerEmail)
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
		let { checked } = this.state;
    return (

      <div className= 'room'>
	    <div className= 'main'>
	    	<div className='left-container'>
	    	</div>
	    	<div className= 'center-container'>
	    		<div className='album-art-container'>
								<Player 
									room={this.state.roomname}
									ownerEmail={this.state.ownerEmail}
									userEmail={this.state.userEmail}
									username={this.state.username}
									playHandler={this.state.client.playHandler}
								/>
	    		</div>
	    	</div> 
	    </div>
			<Fade in={checked} style={{ transitionDelay: checked ? '250ms' : '0ms' }}>
	      <div className= 'chat'>
	      	<Chat username={this.state.username} room={this.state.roomname} chatHistory={this.state.chatHistory}/>
	      </div>
			</Fade>

      </div>
    );
  }
}
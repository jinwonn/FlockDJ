import React, { Component } from 'react';
import '../styles/room.css';
import Chat from './components/Chat.jsx'
import Player from './components/Player.jsx'

export default class Room extends Component {
  constructor(props, context) {
    super(props, context)

		const { chatHistory } = props

		this.state = {
			chatHistory,
			username: null
		}

		this.onMessageReceived = this.onMessageReceived.bind(this)
		this.updateChatHistory = this.updateChatHistory.bind(this)
	}

	componentDidMount() {
		this.props.registerHandler(this.onMessageReceived)

    fetch('/api/getUsername')
      .then(res => res.json())
      .then(user => this.setState({ username: user.username }));
	}

		onMessageReceived(entry) {
			console.log('onMessageReceived:', entry)
			this.updateChatHistory(entry)
		}

		updateChatHistory(entry) {
			this.setState({ chatHistory: this.state.chatHistory.concat(entry) })
		}

  render() {


    return (

      <div className= 'room'>
	      hello this is a room
				<div>{JSON.stringify(this.state)}</div>
	      <div className= 'chat-section'>
	      	Welcome to flock dj chat
	      	<Chat user={this.state.username}/>
	      </div>
        <div>
          <Player />
        </div>
      </div>
    );
  }
}
import React, { Component } from 'react';
import '../styles/room.css';
import Chat from './components/Chat.jsx'
import Player from './components/Player.jsx'
import Mp3Upload from './components/Mp3Upload.jsx'

export default class Room extends Component {
  constructor(props, context) {
    super(props, context)

    const { chatHistory } = props
    this.state = {
    // chatHistory, this is if you want to show previous chat history
      chatHistory: [],
      username: null,
      roomname: this.props.roomname
    };
  }

  componentDidMount() {
    console.log("Room.jsx room name:", this.state.roomname)
    this.props.messageHandler(this.onMessageReceived)
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
	    			<img className='album-art' src='https://i2.wp.com/www.mbird.com/wp-content/uploads/2012/08/george-michael-careless-whisper-album-cover-54772.jpeg'/>
	    			<span className='song-description'>
	    				<h3>Song Title</h3>
	    				<p>Artist Name</p>
	    				<p>Album Name</p>
	    			</span>
	    		</div>
	    		<footer className='bottom-container'>
	    			<p>Next Song: </p>
	    		</footer>
	    	</div>
	    </div>
	      <div className= 'chat'>

	      	<Chat user={this.state.username} room={this.state.roomname} chatHistory={this.state.chatHistory}/>
	      </div>
        <div>
          <Player room={this.state.roomname} playHandler={this.props.playHandler}/>
        </div>
        <div className='mp3-upload'>
          <Mp3Upload />
        </div>
      </div>
    );
  }
}
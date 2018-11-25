import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Link} from 'react-router-dom';
import '../../styles/chat.css'
import ChatBar from './ChatBar.jsx'
import MessageList from './MessageList.jsx';
import socket from '../../socket';


export default class Chat extends Component {
	 constructor(props) {
    	super(props);
    	this.state = {
            client: socket()
    	}
    	this.addMessage = this.addMessage.bind(this);
        
    }

    componentDidMount(){
      

      
    }

	addMessage(message){
		
        let roomName = this.props.room;
		console.log(message)
        this.state.client.message(roomName, message)
            
	}

	render() {
 
    return (
    <div>
        <h3> Flock DJ Chat </h3>
        <div className= 'chat-container'>
            <MessageList messages={this.props.chatHistory}/>      
        </div>
        <div className='chatbar-box'>
              <ChatBar addMessage={this.addMessage}/>
        </div> 
    </div>
    
    );
  }
}
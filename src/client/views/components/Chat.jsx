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
    		messages: [],
            client: socket()
    	}
    	this.addMessage = this.addMessage.bind(this);
    }

    componentDidMount(){
      
        
      
    }

	addMessage(message){
		let newMessage = {
			type: 'postMessage',
        	id: null,
        	username: this.props.user,
        	content: message,
        	color: null
		}
        let roomName = this.props.room;
		console.log(newMessage)
        this.state.client.message(roomName,newMessage)
        this.setState({
                messages: this.state.messages.concat(newMessage)
            });
            
	}

    recieveMessage(){
        var socket = io('http://localhost/')
        socket.on('message', function(msg){
            if (msg.type == 'postMessage'){
               this.setState({
                    messages: this.state.messages.concat(msg)
                }) 
            }
        })
    }

	render() {
 
    return (
    <div>
    <MessageList messages={this.state.messages}/>
     <div className='chatbar-box'>
     	<ChatBar addMessage={this.addMessage}/>
     </div>
     </div>
    );
  }
}
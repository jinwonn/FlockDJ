import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Link} from 'react-router-dom';
import '../../styles/chat.css'
import ChatBar from './ChatBar.jsx'
import MessageList from './MessageList.jsx';


export default class Chat extends Component {
	 constructor(props) {
    	super(props);
    	this.state = {
    		messages: []
    	}
    	this.addMessage = this.addMessage.bind(this);
    }

	addMessage(message){
		let newMessage = {
			type: 'postMessage',
        	id: null,
        	username: this.props.user,
        	content: message,
        	color: null
		}
		console.log(newMessage)
		this.setState({
			messages: this.state.messages.concat(newMessage)
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
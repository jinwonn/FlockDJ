import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Link} from 'react-router-dom';
import '../../../styles/chat.css'
import ChatBar from './ChatBar.jsx'
import MessageList from './MessageList.jsx';
import socket from '../../../socket';


export default class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      client: socket(),
      username: this.props.username
    };
    this.addMessage = this.addMessage.bind(this);
  }

  componentDidMount(){

  }

  addMessage(message) {
    let roomName = this.props.room;
    let username = this.state.username;
    let created_at = (Date.now() / 1000);
    console.log("message added:", message)
    this.state.client.message(roomName, username, message, created_at);
  }

  render() {
    return (
    <div>
        <h4 className='chat-title'> {this.props.room} Chat </h4>
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

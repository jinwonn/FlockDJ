import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Link} from 'react-router-dom';
import '../../styles/chat.css'

export default class ChatBar extends Component{
	constructor(props) {
    	super(props);
    	this.enterMessage = this.enterMessage.bind(this);
    }

	enterMessage(event){
		if(event.keyCode === 13){
			if (event.target.value){
				let message = event.target.value;
				this.props.addMessage(message)
				event.target.value = "";
			}
			
		}
	}

	render() {
 
    return (
     <div className='chat-bar'>
	     <footer>
	    	
	    	<input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyUp={this.enterMessage}/>
	  	 </footer>
     </div>
    );
  }
}
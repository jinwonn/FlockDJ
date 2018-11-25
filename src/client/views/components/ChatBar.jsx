import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Link} from 'react-router-dom';
import '../../styles/chat.css'

export default class ChatBar extends Component{
	constructor(props) {
    	super(props);
    	this.state={
    		charCount: 100
    	}
    	this.enterMessage = this.enterMessage.bind(this);
    	this.charCount = this.charCount.bind(this)
    }

	enterMessage(event){
		if(event.keyCode === 13){
			if (!event.target.value){
				alert("Please enter something!")
			}
			else if (event.target.value.length > 100){
				alert("Character count exceeded! Character limit: 100!")
			}
			else
			{
				let message = event.target.value;
				this.props.addMessage(message)
				event.target.value = "";
			}
			
		}
	}
	charCount(event){
		let char = event.target.value.length;
		let count = 100 - char
		this.setState({
			charCount: count 
		})
	}

	render() {
 
    return (
     <div className='chat-bar'>
	     <footer>
	    	
	    	<input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyUp={this.enterMessage} onChange={this.charCount}/>
	    	<span className='char-count'>{this.state.charCount}</span>
	  	 </footer>
     </div>
    );
  }
}
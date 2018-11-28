import React, { Component } from 'react';
import '../../../styles/chat.css'

export default class ChatBar extends Component{
	constructor(props) {
    	super(props);
    	this.state={
    		charCount: 100
    	}
    }

	enterMessage = (event) => {
    event.preventDefault();
		if(event.keyCode === 13){
      this.setState({
        charCount: 100
      })
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

	charCount = (event) => {
		let char = event.target.value.length;
		this.setState({
			charCount: 100 - char
		})
	}

	render() {

    return (
     <div className='chat-bar'>
	     <footer>
	    	<textarea className="chatbar-message" type="text" rows="3" cols="32" placeholder="Type a message and hit ENTER" onKeyUp={this.enterMessage} onChange={this.charCount}/>
	    	<span className='char-count'>{this.state.charCount}</span>
	  	 </footer>
     </div>
    );
  }
}
import React, {Component} from 'react';


class MessageList extends Component {
  render() {
  	const messages = this.props.messages.map(msg =>{
  		return (
        <span>
          <p>{msg.username}</p>
          <p>{msg.content}</p>
        </span>
  		)
  	});
    
    return (
     
      <main className="messages" >
          <p>{messages}</p>
      </main>

    );
  }
}
export default MessageList;
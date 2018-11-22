import React, {Component} from 'react';


class MessageList extends Component {
  render() {
  	const messages = this.props.messages.map(msg =>{
  		if (msg.message){
          return (
          <span>
            <p>{msg.user}</p>
            <p>{msg.message}</p>
          </span>
        )
      }
      if (msg.event){
        return (
          <span>
            <p><em>{msg.event}</em></p>
          </span>
        )
      }
    
  	});
    
    return (
     
      <main className="messages" >
          <p>{messages}</p>
      </main>

    );
  }
}
export default MessageList;
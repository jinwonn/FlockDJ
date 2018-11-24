import React, {Component} from 'react';
import '../../styles/chat.css'

class MessageList extends Component {

  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  }

  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }


  render() {
  	const messages = this.props.messages.map(msg =>{
  		if (msg.message){
          return (
          <span className='message-container'>
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
          <div style={{ float:"left", clear: "both" }}
             ref={(el) => { this.messagesEnd = el; }}>
          </div>
      </main>

    );
  }
}
export default MessageList;
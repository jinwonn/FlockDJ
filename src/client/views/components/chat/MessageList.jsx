import React, {Component} from 'react';
import Timestamp from 'react-timestamp';
import '../../../styles/chat.css'

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
          <span>
            <div className='message-container'>
              <span className='message-body-text'>{msg.message}</span>
            </div>
            <div className='message-info'>
              <span className="message-sender">{msg.user}</span>
              <span className="message-timestamp">
                <Timestamp time={msg.created_at} autoUpdate/>
              </span>
            </div>
          </span>
        )
      }
      if (msg.event){
        return (
          <span className="message-event">
            <p><em>{msg.user} {msg.event}</em></p>
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
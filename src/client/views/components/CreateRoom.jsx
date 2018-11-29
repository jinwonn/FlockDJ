import React, { Component } from 'react';
import Fade from '@material-ui/core/Fade';
import Collapse from '@material-ui/core/Collapse';
import socket from '../../socket';
import '../../styles/browse.css'

export default class CreateRoom extends Component {

constructor(props, context) {
    super(props, context)

    		
    this.state = {
    	client: socket(),
			roomName: null,
			username: this.props.username,
			email: this.props.email,
			showButton: true,
			checked: true,
			fade: true
    };
  }

  handleChange = () => {
    this.setState(state => ({ checked: !state.checked }));
  };

  handleEnterName = (event) =>{
  	this.setState({
  		roomName: event.target.value
  	})
  }

  sendRoomData = () =>{
  	console.log(this.state.roomName)
    if(this.state.roomName){
    	let room = this.state.roomName
  		let email = this.state.email
  		let username = this.state.username
    	this.state.client.createRoom(room, username, email)
			this.handleChange()
    }
  }

  render() {
		let { checked, fade } = this.state;
  	const styleButton = this.state.showButton ? {}:{display: 'none'};
    return (
    	<div className='create-form-container'>
				<Fade in={fade} style={{ transitionDelay: checked ? '350ms' : '0ms' }}>
      	  <button type="button" className="btn btn-primary" id='create-room-button' onClick={this.handleChange} style={styleButton}>
      	   Create Room
      	  </button>
				</Fade>
				<Collapse in={!checked}>
					<div>
						<Fade in={!checked}>
        			<form className="create-room" onSubmit={this.sendRoomData}>
        			  <label className='roomname-label'>
    							Room Name:
        			  </label>
   							<input className='room-name' type="text" placeholder='Enter room name'name="name" onChange={this.handleEnterName} />
  							<button className='btn btn-secondary' type="submit" id='room-input'>Create</button>
			  			</form>
						</Fade>
					</div>
				</Collapse>
    	</div>
    );
  }






} 
import React, { Component } from 'react';
import Fade from '@material-ui/core/Fade';
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
    	showForm: false,
			showButton: true,
			checked: true
    };
  }

  showForm = () =>{
  	this.setState({
  		showForm: true
  	})
  }

  hideForm = () =>{
  	this.setState({
  		showForm: false,
  		showButton: false
  	})
  }

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
      hideForm()
    }
  }

  render() {
		let { checked } = this.state;
  	const styleForm = this.state.showForm ? {}:{display: 'none'};
  	const styleButton = this.state.showButton ? {}:{display: 'none'};
    return (
    	<div className='create-form-container'>
				<Fade in={checked} style={{ transitionDelay: checked ? '350ms' : '0ms' }}>
      	  <button type="button" className="btn btn-primary" id='create-room-button' onClick={this.showForm} style={styleButton}>
      	   Create Room
      	  </button>
				</Fade>
        <form className="create-room" onSubmit={this.sendRoomData} style={styleForm}>
          <label className='roomname-label'>
    			 Room Name:
          </label>
   				 <input className='room-name' type="text" placeholder='Enter room name'name="name" onChange={this.handleEnterName} />
  				
  				<button className='btn btn-secondary' type="submit" id='room-input'>Create</button>
			  </form>
    	</div>
    
    );
  }






} 
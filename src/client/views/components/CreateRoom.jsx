import React, { Component } from 'react';
import socket from '../../socket';

export default class CreateRoom extends Component {

constructor(props, context) {
    super(props, context)

    		
    this.state = {
    	client: socket(),
    	roomName: null,
    	showForm: false,
    	showButton: true      	
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
  	let room = this.state.roomName
		// let user = this.props.user
		let user = "user"
  	this.state.client.createRoom(room,user)
    hideForm()
  }

  render() {

  	const styleForm = this.state.showForm ? {}:{display: 'none'};
  	const styleButton = this.state.showButton ? {}:{display: 'none'};
    return (
    	<div>
    		<button className="create-button" onClick={this.showForm} style={styleButton}>Create Room</button>

        <form className="create-room" onSubmit={this.sendRoomData} style={styleForm}>
  				<label>
    			Room Name:
   				 <input type="text" name="name" onChange={this.handleEnterName} />
  				</label>
  				<input type="submit" value="Submit"  />
			  </form>

    	</div>
    
    );
  }






} 
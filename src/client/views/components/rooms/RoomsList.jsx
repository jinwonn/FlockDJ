import React, { Component } from 'react';
import Rooms from './Rooms.jsx'
import '../../../styles/browse.css';
import CreateRoom from '../CreateRoom.jsx';

export default class RoomsList extends Component {
  constructor(props, context) {
    super(props, context)

    this.state = {
      rooms: this.props.rooms,
      username: this.props.username,
      email: this.props.email
    };
  }

  render() {
    return (
      <div>
        <CreateRoom 
          className="create-room"
          username={this.state.username}
          email={this.state.email}/>
        <div className="container mt-3">
          <div className="row">
            <div className="card-deck justify-content-center">
              {
                this.state.rooms.map(room => (
                  <Rooms
                    key={room.name}
                    room={room}
                  />
                ))
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
}
import React from 'react';
import Rooms from './Rooms.jsx'
import '../../../styles/browse.css';
import CreateRoom from '../CreateRoom.jsx';

export default ({
  rooms
}) => (
  <div>
    <CreateRoom className="create-room"/>
    <div className="container mt-3">
      <div className="row">
        <div className="card-deck justify-content-center">
          {
            rooms.map(room => (
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
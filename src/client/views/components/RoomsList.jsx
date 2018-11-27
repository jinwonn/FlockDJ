import React from 'react';
import Rooms from './Rooms.jsx'
import '../../styles/browse.css';

export default ({
  rooms,
  onEnterRoom
}) => (
  <div className="card-layout">
    <div className="card-deck">
      {
        rooms.map(room => (
          <Rooms
            key={room.name}
            room={room}
            onEnter={() => onEnterRoom(room.name)}
          />
        ))
      }
    </div>
  </div>
)

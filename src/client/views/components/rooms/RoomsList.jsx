import React from 'react';
import Rooms from './Rooms.jsx'
import '../../../styles/browse.css';
import CreateRoom from '../CreateRoom.jsx';

export default ({
  rooms
}) => (
  <div>
  <CreateRoom className="create-room"/>
    <div className="card-layout">
      <div className="card-deck">
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
)
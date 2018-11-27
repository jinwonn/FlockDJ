import React from 'react';
import CreateRoom from './CreateRoom.jsx';
import Rooms from './Rooms.jsx'
import '../../styles/browse.css';

export default ({
  rooms,
  user,
  onEnterRoom
}) => (
  <div>
    <CreateRoom user={user}/>
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
)
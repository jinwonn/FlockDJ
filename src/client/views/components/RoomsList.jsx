import React from 'react';
import CreateRoom from './CreateRoom.jsx';
import Rooms from './Rooms.jsx'

export default ({
  rooms,
  user,
  onEnterRoom
}) => (
  <div>
    <CreateRoom user={user}/>
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
)

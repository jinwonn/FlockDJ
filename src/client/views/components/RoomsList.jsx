import React from 'react';

import Rooms from './Rooms.jsx'

export default ({
  rooms,
  onEnterRoom
}) => (
  <div>
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

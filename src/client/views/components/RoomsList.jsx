import React from 'react';

import Rooms from './Rooms.jsx'

export default ({
  rooms,
}) => (
  <div>
    {
      rooms.map(room => (
        <Rooms
          key={room.name}
          room={room}
        />
      ))
    }
  </div>
)

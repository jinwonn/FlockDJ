import React from 'react';

export default ({ room, onEnter }) => (
    <button onClick={onEnter}>
        {room.name} room
    </button>
)

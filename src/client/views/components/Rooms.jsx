import React from 'react';
import { Link } from 'react-router-dom';

export default ({ room }) => (
    <Link to={`/${room.name}`}>{room.name} room</Link>
)

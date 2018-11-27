import React from 'react';
import { Link } from 'react-router-dom';

export default ({ room, onEnter }) => (
    /*<button onClick={onEnter}>
        {room.name} room
    </button>*/
    <div className="card" style={{width: '18rem'}}>
      <img className="card-img-top" src="https://charliebarnett.com/wp-content/themes/soundcheck/images/default-album-artwork.png" alt="Card image cap"></img>
      <div className="card-body">
        <h5 className="card-title">{room.name}</h5>
        <a onClick={onEnter} className="btn btn-primary">Enter Room</a>
      </div>
    </div>
export default ({ room }) => (
    <Link to={`/${room.name}`}>{room.name} room</Link>
)

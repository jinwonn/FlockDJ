import React from 'react';
import { Link } from 'react-router-dom';

export default ({ room, onEnter }) => (
    <div className="card" style={{width: '18rem'}}>
      <img className="card-img-top" src="https://charliebarnett.com/wp-content/themes/soundcheck/images/default-album-artwork.png" alt="Card image cap"></img>
      <div className="card-body">
        <h5 className="card-title">{room.name}</h5>
        <Link className="btn btn-primary" to={`/${room.name}`}>
        {/* {room.name} room */}
        Enter Room
        </Link>
      </div>
    </div>
)

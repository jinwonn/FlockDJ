import React from 'react';
import { Link } from 'react-router-dom';

export default ({ room, onEnter }) => (
    <div className="card" style={{width: '18rem'}} onClick={onEnter}>
      <img className="card-img-top" src="https://charliebarnett.com/wp-content/themes/soundcheck/images/default-album-artwork.png" alt="Card image cap"></img>
      <div className="card-body">
        <h6 className="card-title">{room.name}</h6>
      </div>
    </div>
)

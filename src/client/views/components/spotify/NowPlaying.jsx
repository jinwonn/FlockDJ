import React, { Component } from 'react';

export default class NowPlaying extends Component {
  render() {
    let {
      playerState,
      playerState: { position: position_ms }
    } = this.props;
    let {
      uri: track_uri,
      name: track_name,
      duration_ms,
      artists: [{
        name: artist_name,
        uri: artist_uri
      }],
      album: {
        name: album_name,
        uri: album_uri,
        images: [{ url: album_image }]
      }
    } = playerState.track_window.current_track;

    return (
      <div>
      <img className='album-art' src={album_image} alt={track_name} />
	    			<span className='song-description'>
	    				<h3 href={track_uri}>{track_name}</h3>
	    				<p href={artist_uri}>{artist_name}</p>
	    				<p href={album_uri}>{album_name}</p>
              <p>Position: {position_ms} | Duration: {duration_ms}</p>
	    			</span>
      </div>
    );
  }
}
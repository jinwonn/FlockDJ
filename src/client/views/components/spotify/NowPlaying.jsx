import React, { Component } from 'react';
import { Progress } from 'react-sweet-progress';
import "react-sweet-progress/lib/style.css";

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
    let progress = ((position_ms / duration_ms) * 100)

    return (
      <div>
      <img className='album-art' src={album_image} alt={track_name} />
	    			<span className='song-description'>
	    				<h3 href={track_uri}>{track_name}</h3>
	    				<p href={artist_uri}>{artist_name}</p>
	    				<p href={album_uri}>{album_name}</p>
              <p><Progress percent={progress} /></p>
	    			</span>
      </div>
    );
  }
}
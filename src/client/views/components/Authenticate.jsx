import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import '../../styles/reset.css';
import '../../styles/authenticate.css';
import partyParrot from '../../assets/spotify-logo.png';


export default class Authenticate extends Component {
	render() {
		return (

			<div className="flex-container">
        <div className="content-container">
            <h1>modern radio.</h1>
            <a href="/auth">
            <div className="spotify-login-button">
                <span className="spotify-login-button-text">CONNNECT TO SPOTIFY</span>
            </div>
        </a>
        </div>
    </div>

			)
	}
}
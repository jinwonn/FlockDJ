import React, { Component } from 'react';
import '../../styles/navbar.css';

export default class Navbar extends Component {

  render() {

    return (
      <div>
        <nav class="navbar navbar-expand-lg navbar-light bg-dark">
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="navbar-brand">FlockDJ</div>

          <div class="collapse navbar-collapse" id="navbarTogglerDemo03">
            <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
              <li class="nav-item active">
                <a class="nav-link" href="/">Home <span class="sr-only">(current)</span></a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class Rooms extends Component {
  constructor(props, context) {
    super(props, context)
    
    this.state = {
      room: this.props.room
    };
    
    this.routeChange = this.routeChange.bind(this);
  }

  routeChange() {
    let path = `/${this.state.room.name}`;
    this.props.history.push(path);
  }


  render() {  
    return (
      <div className="card" style={{width: '18rem'}} onClick={this.routeChange}>
        <img className="card-img-top" src="https://charliebarnett.com/wp-content/themes/soundcheck/images/default-album-artwork.png" alt="Card image cap"></img>
        <div className="card-body">
          <h6 className="card-title">{this.state.room.name}</h6>
        </div>
      </div>
    )
  }
}
export default withRouter(Rooms);
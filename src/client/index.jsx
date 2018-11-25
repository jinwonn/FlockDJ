import React from 'react';
import ReactDOM from 'react-dom';
import Main from './views/Main.jsx';

ReactDOM.render(<Main />, document.getElementById('root'));

if (module.hot) {
  module.hot.accept('./views/Main.jsx', () => {
    const NextMain = require('./views/Main.jsx').default    
    ReactDOM.render(<NextMain />,document.getElementById('root')    )
  })
}
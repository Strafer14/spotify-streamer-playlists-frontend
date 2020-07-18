import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import amplitude from 'amplitude-js';

window.amplitude = amplitude.getInstance();
amplitude.init("a0cd2bd36a57e135c13ec48f4e385d16");

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

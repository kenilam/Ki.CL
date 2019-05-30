import { loadPolyfill } from '@Core';
import React from 'react';
import ReactDOM from 'react-dom';
import App, { appRoot } from './App.hot';

loadPolyfill().then( () => {
  ReactDOM.render( <App/>, appRoot );
} );

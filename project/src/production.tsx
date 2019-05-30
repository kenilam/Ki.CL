import { loadPolyfill } from '@Core';
import React from 'react';
import ReactDOM from 'react-dom';
import App, { appRoot } from './App';

loadPolyfill().then( () => {
  ReactDOM.render( <App/>, appRoot );
} );

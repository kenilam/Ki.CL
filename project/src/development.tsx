import { Polyfill } from '@/Core';
import React from 'react';
import ReactDOM from 'react-dom';
import App, { appRoot } from './App.hot';

Polyfill.load().then(() => {
  ReactDOM.render(<App />, appRoot);
});

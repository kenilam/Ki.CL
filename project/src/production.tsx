import React from 'react';
import ReactDOM from 'react-dom';
import App, { appRoot } from './App';

import { loadPolyfill } from '@Core';

loadPolyfill().then(() => {
  ReactDOM.render(<App />, appRoot);
});

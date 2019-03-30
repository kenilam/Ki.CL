import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App, { appRoot } from './App.hot';

import { loadPolyfill } from './Core';

loadPolyfill().then(() => {
  ReactDOM.render(<App />, appRoot);
});

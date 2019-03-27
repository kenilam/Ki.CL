import React from 'react';
import ReactDOM from 'react-dom';

import Core from './Core';
import App, { appRoot } from './App.hot';

export default new Core(() => {
  ReactDOM.render(<App />, appRoot);
});

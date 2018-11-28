import React from 'react';

import State, { Connector } from 'State';
import View from 'View';

import { GlobalHeader } from 'Component';

import './style.scss';

const Component = ({ style, updateStyle }) => {
  const resizeHandler = ({ height } = {}) => {
    updateStyle({ paddingTop: height });
  }

  return (
    <React.Fragment>
      <GlobalHeader { ...{ resizeHandler } } />
      <View { ...{ style } } />
    </React.Fragment>
  )
};

const Instance = Connector(Component);

const App = () => (
  <State>
    <Instance />
  </State>
);

const appRoot = document.querySelector('[app-root]');

export { appRoot };
export default App;

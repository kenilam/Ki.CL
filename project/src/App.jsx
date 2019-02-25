// @flow
import 'abortcontroller-polyfill/dist/polyfill-patch-fetch';
import React from 'react';

import './Core';
import State from './State';
import View from './View';

import './style';

const appRoot = document.querySelector('[app-root]');

class App extends React.PureComponent {
  componentDidCatch(error, info) {
    console.error(error, info);
  }

  render() {
    return (
      <State>
        <View />
      </State>
    );
  }
}

window.kicl = {
  ref: {}
};

window.onscroll = event => {
  window.kicl.ref.scrollTop = event.target.scrollingElement.scrollTop;
};

export { appRoot };
export default App;

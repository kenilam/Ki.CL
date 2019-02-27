// @flow
import 'abortcontroller-polyfill/dist/polyfill-patch-fetch';
import React from 'react';

import { Errors } from 'Component';

import State from './State';
import View from './View';

import './style';

const appRoot = document.querySelector('[app-root]');

class App extends React.PureComponent {
  constructor() {
    super();

    this.state = {
      errors: null
    };
  }

  static getDerivedStateFromError(errors) {
    return { errors };
  }

  componentDidCatch(errors, info) {
    console.error(errors, info);
  }

  render() {
    const { errors } = this.state;

    if (errors) {
      return <Errors errors={errors} show={Boolean(errors)} />;
    }

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

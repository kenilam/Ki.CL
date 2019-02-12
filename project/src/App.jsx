// @flow
import 'abortcontroller-polyfill/dist/polyfill-patch-fetch';

import View from './View';

import './style.scss';

const App = View;

const appRoot = document.querySelector('[app-root]');

window.kicl = {
  ref: {}
};

window.onscroll = event => {
  window.kicl.ref.scrollTop = event.target.scrollingElement.scrollTop;
};

export { appRoot };
export default App;

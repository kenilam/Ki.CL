import { loadPolyfill } from './Polyfill';

import './Reset';
import './Core';

class Core {
  constructor(init) {
    loadPolyfill().then(init);
  }
}

export default Core;

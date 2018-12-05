import { debounce } from 'Core/Utilities';

import * as classNames from './classNames';
import duration from './duration';

const eventHanlder = ({ handler, event, middleware }) => async node => {
  if (middleware && node) {
    middleware(node);
  }

  if (!handler || !event) {
    return;
  }

  if (!node) {
    handler(node);
    return;
  }

  await handler(node);

  node.classList.remove(classNames[event]);
  
  await debounce(duration(node));

  node.classList.remove(classNames.node);
}

export default eventHanlder;

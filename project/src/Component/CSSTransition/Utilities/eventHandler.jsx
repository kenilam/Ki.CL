import { debounce } from 'Helper';

import combineClassNames from 'classnames';

import classNames from './classNames';
import duration from './duration';

const eventHandler = ({
  middleware,
  middlewareProps
} = {}) => async node => {
  if (!node) {
    return;
  }

  const contains = node.classList.contains(classNames.base);
  
  if (!contains) {
    node.className = combineClassNames(classNames.base, node.className);
  }

  if (middleware) {
    await middleware(node, { ...middlewareProps });
  }

  const time = duration(node);

  await debounce( time );

  node.classList.remove(classNames.entered);
  node.classList.remove(classNames.exited);

  await debounce( time );

  node.classList.remove(classNames.base);
}

export default eventHandler;

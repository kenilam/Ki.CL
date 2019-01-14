import { debounce } from 'Helper';

import combineClassNames from 'classnames';

import classNames from './classNames';
import duration from './duration';

const { base, entered, exited } = classNames;

const eventHandler = ({
  middleware,
  middlewareProps,
  transitionStyle
} = {}) => async node => {
  if (!node) {
    return;
  }

  const style = `${classNames.transitionStylePrefix}${transitionStyle}`;

  const { className, classList } = node;

  const contains = classList.contains(base);
  
  if (!contains) {
    node.className = combineClassNames(base, className);
  }

  node.classList.add(style);

  if (middleware) {
    await middleware(node, { ...middlewareProps });
  }

  const time = duration(node);

  await debounce( time );

  node.classList.remove(entered);
  node.classList.remove(exited);
  node.classList.remove(style);
  node.classList.remove(base);
}

export default eventHandler;

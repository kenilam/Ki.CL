import transitionDuration from 'get-transition-duration';

import { all } from './classNames';

const duration = node => {
  const parent = node && node.parentNode;

  if (!parent) {
    return 0;
  }

  const nodes = Array.from(parent.querySelectorAll(all));

  return Math.max(...nodes.map(n => transitionDuration(n, true)));
}

export default duration;

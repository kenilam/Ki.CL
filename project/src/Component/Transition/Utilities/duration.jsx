import transitionDuration from 'get-transition-duration';

import { allSelectors } from './classNames';

const duration = node => {
  if (!node || !node.parentNode) {
    return 0;
  }

  const nodes = Array.from(
    node.parentNode.querySelectorAll(allSelectors)
  );

  return Math.max(
    ...nodes.map(n => transitionDuration(n, true))
  );
};

export default duration;

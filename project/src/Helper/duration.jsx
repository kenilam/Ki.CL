import transitionDuration from 'get-transition-duration';

import { classname } from 'Component/CSSTransition/style';

const duration = node => {
  const parent = node && node.parentNode;
  const nodes = Array.from(parent.querySelectorAll(`.${classname}`));

  if (!parent || nodes.length === 0) {
    return 0;
  }

  return Math.max(...nodes.map(n => transitionDuration(n, true)));
};

export default duration;

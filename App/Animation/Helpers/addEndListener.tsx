// Libraries
import { CSSUnit } from '@/Helper';
import { EndHandler } from 'react-transition-group/Transition';

const addEndListener: EndHandler<undefined> = (node, done) => {
  const transitionDuration = CSSUnit({
    values: window.getComputedStyle(node).transitionDuration,
  });
  const transitionDelay = CSSUnit({
    values: window.getComputedStyle(node).transitionDelay,
  });

  const wait = transitionDuration + transitionDelay;

  window.setTimeout(done, wait);
};

export default addEndListener;

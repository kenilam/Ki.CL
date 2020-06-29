import Style from '@/Component/CSSTransition/Style';
import { CSSUnit } from '@/Helper';
import getTransitionDuration from 'get-transition-duration';

const getAnimationDuration = (node: HTMLElement) => {
  const styles = window.getComputedStyle(node);

  if (styles.animationName === 'none') {
    return 0;
  }

  return (
    (CSSUnit(styles.animationDuration) || 0) +
    (CSSUnit(styles.animationDelay) || 0)
  );
};

const duration = (node: HTMLElement) => {
  if (!node || !node.parentNode) {
    return 0;
  }

  const nodes = [].concat(
    Array.from(node.parentNode.querySelectorAll(`.${Style.default}`)),
    Array.from(node.querySelectorAll(`.${Style.default}`))
  );

  const durations = nodes.map((elm: HTMLElement) =>
    Math.max(getTransitionDuration(elm, true), getAnimationDuration(elm))
  );

  return Math.max(...durations);
};

export default duration;

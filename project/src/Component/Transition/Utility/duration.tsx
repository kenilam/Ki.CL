import Style from '@/Component/Transition/Style';
import { CSSUnit } from '@/Helper';
import getTransitionDuration from 'get-transition-duration';

const SELECTOR = `[data-component=${Style.default}]`;

const getAnimationDuration = (node: HTMLElement) => {
  const styles = window.getComputedStyle(node);

  if (styles.animationName === 'none') {
    return 0;
  }

  return (
    (CSSUnit({ values: styles.animationDuration }) || 0) +
    (CSSUnit({ values: styles.animationDelay }) || 0)
  );
};

const duration = (node: HTMLElement) => {
  if (!node || !node.parentNode) {
    return 0;
  }

  const nodes = [].concat(
    Array.from(node.parentNode.querySelectorAll(SELECTOR)),
    Array.from(node.querySelectorAll(SELECTOR))
  );

  const durations = nodes.map((elm: HTMLElement) =>
    Math.max(getTransitionDuration(elm, true), getAnimationDuration(elm))
  );

  return Math.max(...durations);
};

export default duration;

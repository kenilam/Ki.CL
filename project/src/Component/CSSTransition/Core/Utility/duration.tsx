import Style from '@/Component/CSSTransition/Core/Style';
import {CSSUnit} from '@/Helper';
import getTransitionDuration from 'get-transition-duration';

const getAnimationDuration = (node: HTMLElement) => {
  if (window.getComputedStyle(node).animationName === 'none') {
    return 0;
  }
  
  return (
    CSSUnit(window.getComputedStyle(node).animationDuration) || 0
  ) + (
    CSSUnit(window.getComputedStyle(node).animationDelay) || 0
  );
};

const duration = (node: HTMLElement) => (
  node && node.parentNode ? (
    Math.max(
      ...[].concat(
        Array.from(
          node.parentNode.querySelectorAll(`.${Style.default}`)
        ),
        Array.from(
          node.querySelectorAll(`.${Style.default}`)
        )
      ).map(
        (elm: HTMLElement) => Math.max(
          getTransitionDuration(elm, true), getAnimationDuration(elm)
        )
      )
    )
  ) : 0
);

export default duration;

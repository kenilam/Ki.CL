import Style from '@/Component/CSSTransition/Core/Style';
import {CSSUnit} from '@/Helper';
import getTransitionDuration from 'get-transition-duration';
import {EndHandler} from 'react-transition-group/Transition';

const {setTimeout} = window;

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
        ),
        Array.from(
          node.children
        )
      ).map(
        (elm: HTMLElement) => Math.max(
          getTransitionDuration(elm, true), getAnimationDuration(elm)
        )
      )
    )
  ) : 0
);

const addEndListener: EndHandler = (node, done) => {
  const waitTime = duration(node);
  
  if (waitTime === 0) {
    done();
    return;
  }
  
  setTimeout(done, duration(node));
};

export default addEndListener;

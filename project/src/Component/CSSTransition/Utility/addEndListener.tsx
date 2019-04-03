import {className} from '@Component/CSSTransition/Style';
import getTransitionDuration from 'get-transition-duration';
import {EndHandler} from 'react-transition-group/Transition';

const {setTimeout} = window;

const getAnimationDuration = (node: HTMLElement) => parseFloat(node.style.animationDuration) || 0;

const duration = (node: HTMLElement) => Math.max(
  ...Array.from(
    node.parentNode.querySelectorAll(`.${className}`)
  ).map(
    (node: HTMLElement) => Math.max(
      getTransitionDuration(node), getAnimationDuration(node)
    )
  )
);

const addEndListener: EndHandler = (node, done) => {
  setTimeout(done, duration(node));
};

export default addEndListener;

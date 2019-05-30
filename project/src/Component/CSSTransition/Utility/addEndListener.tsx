import Style from '@Component/CSSTransition/Style';
import getTransitionDuration from 'get-transition-duration';
import { EndHandler } from 'react-transition-group/Transition';

const { setTimeout } = window;

const getAnimationDuration = ( node: HTMLElement ) =>
  parseFloat( node.style.animationDuration ) || 0;

const duration = ( node: HTMLElement ) => (
  node && node.parentNode ? (
    Math.max(
      ...[].concat(
        Array.from(
          node.parentNode.querySelectorAll( `.${ Style.cssTransition }` )
        ),
        Array.from(
          node.querySelectorAll( `.${ Style.cssTransition }` )
        )
      ).map(
        ( node: HTMLElement ) => Math.max(
          getTransitionDuration( node, true ), getAnimationDuration( node )
        )
      )
    )
  ) : 0
);

const addEndListener: EndHandler = ( node, done ) => {
  const waitTime = duration( node );
  
  if (waitTime === 0) {
    done();
    return;
  }
  
  setTimeout( done, duration( node ) );
};

export default addEndListener;

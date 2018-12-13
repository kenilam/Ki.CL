// @flow
import React from 'react';
import { CSSTransition as CSSTransitionOrigin } from 'react-transition-group';

import { addEndListener, classNames, duration, eventHandler } from './Utilities';

import './style.scss';

type Node = React.Node;

type ClassName = {} | Array | String;

type EventHandler = (node: Node) => void;

type Props = {
  children: Node,
  className: ClassName,
  transitionIn: Boolean,
  transitionKey: String,
  transitionStyle: String,
  onEnter?: EventHandler,
  onEntered?: EventHandler,
  onExit?: EventHandler,
  unmountOnExit?: Boolean
};

const CSSTransition = ({
  children,
  transitionIn,
  transitionKey,
  onEnter = CSSTransition.defaultProps.onEnter,
  onEntered = CSSTransition.defaultProps.onEntered,
  onExit = CSSTransition.defaultProps.onExit,
  unmountOnExit = CSSTransition.defaultProps.unmountOnExit,
  ...rest
}: Props) => (
  <CSSTransitionOrigin
    classNames={ classNames.base }
    in={ transitionIn }
    key={ transitionKey }
    onEnter={ eventHandler({ middleware: onEnter }) }
    onExit={ eventHandler({ middleware: onExit }) }
    { ...{ addEndListener, onEntered, unmountOnExit, ...rest } }
  >
    { children }
  </CSSTransitionOrigin>
);

CSSTransition.defaultProps = {
  onEnter () {},
  onEntered () {},
  onExit () {},
  unmountOnExit: true
}

export { duration };
export default CSSTransition;

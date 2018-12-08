// @flow
import React from 'react';
import { CSSTransition as CSSTransitionOrigin } from 'react-transition-group';

import { addEndListener, classNames, duration, eventHandler } from './Utilities';

type Node = React.Node;

type EventHandler = (node: Node) => void;

type Props = {
  children: Node,
  inValue: Boolean,
  keyValue: String,
  onEnter?: EventHandler,
  onEntered?: EventHandler,
  onExit?: EventHandler,
  onExited?: EventHandler
};

const CSSTransition = ({
  children,
  inValue,
  keyValue,
  onEnter,
  onEntered,
  onExit,
  ...rest
}: Props) => (
  <CSSTransitionOrigin
    classNames={ classNames.base }
    in={ inValue }
    key={ keyValue }
    onEnter={ eventHandler({ middleware: onEnter }) }
    onExit={ eventHandler({ middleware: onExit }) }
    { ...{ addEndListener, onEntered, ...rest } }
  >
    { children }
  </CSSTransitionOrigin>
);

CSSTransition.defaultProps = {
  onEnter () {},
  onEntered () {},
  onExit () {},
  onExited () {}
}

export { duration };
export default CSSTransition;

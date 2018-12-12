// @flow
import React from 'react';
import { CSSTransition as CSSTransitionOrigin } from 'react-transition-group';
import classnames from 'classnames';

import { addEndListener, classNames, duration, eventHandler } from './Utilities';

import './style.scss';

type Node = React.Node;

type ClassName = {} | Array | String;

type EventHandler = (node: Node) => void;

type Props = {
  children: Node,
  className: ClassName,
  inValue: Boolean,
  keyValue: String,
  onEnter?: EventHandler,
  onEntered?: EventHandler,
  onExit?: EventHandler,
  onExited?: EventHandler
};

const CSSTransition = ({
  children,
  className,
  inValue,
  keyValue,
  onEnter,
  onEntered,
  onExit,
  ...rest
}: Props) => (
  <CSSTransitionOrigin
    classNames={ classnames(classNames.base, className) }
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

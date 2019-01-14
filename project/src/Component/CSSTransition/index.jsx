// @flow
import React from 'react';
import classnames from 'classnames';
import { CSSTransition as CSSTransitionOrigin } from 'react-transition-group';

import { addEndListener, classNames, duration, eventHandler } from './Utilities';

import './style.scss';

type Node = React.Node;

type ClassName = {} | Array | String;

type EventHandler = (node: Node) => void;

type Props = {
  className: ClassName,
  children: Node,
  onEnter?: EventHandler,
  onEntered?: EventHandler,
  onExit?: EventHandler,
  transitionIn: Boolean,
  transitionKey: String,
  transitionStyle?: String,
  unmountOnExit?: Boolean
};

const CSSTransition = ({
  children: childrenOrign,
  onEnter = CSSTransition.defaultProps.onEnter,
  onEntered = CSSTransition.defaultProps.onEntered,
  onExit = CSSTransition.defaultProps.onExit,
  transitionIn,
  transitionKey,
  transitionStyle = CSSTransition.defaultProps.transitionStyle,
  unmountOnExit = CSSTransition.defaultProps.unmountOnExit,
  ...rest
}: Props) => {
  const { type } = childrenOrign;

  const origin = type === React.Node ? childrenOrign() : childrenOrign;

  const { props } = origin;

  const isSwitch = origin.type.displayName === 'Switch';

  const { className } = props;

  const children = Array.isArray(props.children) ? props.children.map(
    child => React.cloneElement(child, {
      className: classnames(child.props.className, className)
    })
  ) : origin;

  const Component = React.cloneElement(origin, { children, className: !isSwitch && className });

  return (
    <CSSTransitionOrigin
      classNames={ classNames.base }
      in={ transitionIn }
      key={ transitionKey }
      onEnter={ eventHandler({ middleware: onEnter, transitionStyle }) }
      onExit={ eventHandler({ middleware: onExit, transitionStyle }) }
      { ...{ addEndListener, onEntered, unmountOnExit, ...rest } }
    >
      { Component }
    </CSSTransitionOrigin>
  );
}

CSSTransition.defaultProps = {
  onEnter () {},
  onEntered () {},
  onExit () {},
  transitionStyle: classNames.transitionStyle,
  unmountOnExit: true
}

export { duration };
export default CSSTransition;

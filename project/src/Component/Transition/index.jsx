// @flow
import React from 'react';
import { TransitionGroup } from 'react-transition-group';

import { CSSTransition } from 'Component';

import { classNames } from './Utilities';

type Node = React.Node;

type EventHandler = (node: Node) => void;

type Props = {
  children: Node,
  component?: Node,
  keyValue: String,
  onEnter?: EventHandler,
  onExit?: EventHandler
};

const Transition = ({
  children,
  component,
  keyValue,
  onEnter,
  onExit,
}: Props) => (
  <TransitionGroup { ...{ component } }>
    { CSSTransition({
      onEnter (node) {
        onEnter(node);
        classNames.add(node);
      },
      onEntered: classNames.remove,
      onExit,
      children,
      keyValue
    }) }
  </TransitionGroup>
);

Transition.defaultProps = {
  component: React.Fragment,
  onEnter () {},
  onExit () {}
}

export default Transition;

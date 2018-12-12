// @flow
import React from 'react';
import { TransitionGroup } from 'react-transition-group';

import { CSSTransition } from 'Component';

import { classNames } from './Utilities';

import './style.scss';

type Node = React.Node;

type EventHandler = (node: Node) => void;

type Props = {
  component?: Node,
  keyValue: String,
  onEnter?: EventHandler,
  onExit?: EventHandler
};

const Transition = ({
  component,
  keyValue,
  onEnter,
  onExit,
  ...rest
}: Props) => (
  <TransitionGroup { ...{ component } }>
    { CSSTransition({
      onEnter (node) {
        onEnter(node);
        classNames.add(node);
      },
      onEntered: classNames.remove,
      onExit,
      keyValue,
      ...rest
    }) }
  </TransitionGroup>
);

Transition.defaultProps = {
  component: React.Fragment,
  onEnter () {},
  onExit () {}
}

export default Transition;

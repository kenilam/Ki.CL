// @flow
import React from 'react';
import { TransitionGroup } from 'react-transition-group';

import { CSSTransition } from 'Component';

import { parentClassNames } from './Utilities';

import './style.scss';

type Node = React.Node;

type EventHandler = (node: Node) => void;

type Props = {
  children: Node,
  component?: Node,
  onEnter?: EventHandler,
  onExit?: EventHandler
};

const Transition = ({
  children,
  component,
  onEnter,
  onExit,
  ...rest
}: Props) => (
  <TransitionGroup { ...{ component } }>
    {
      React.Children.map(
        children,
        child => {
          const { type } = child;

          const {
            transitionKey,
            transitionIn,
            transitionStyle,
            ...props
          } = child.props;

          return CSSTransition({
            onEnter (node) {
              onEnter(node);
              parentClassNames.add(node);
            },
            onExit,
            onEntered: parentClassNames.remove,
            transitionKey: child.props.transitionKey,
            children: () => React.cloneElement(
              React.createElement(type),
              { ...rest, ...props }
            ),
            ...rest
          })
        }
      )
    }
  </TransitionGroup>
);

Transition.defaultProps = {
  component: React.Fragment,
  onEnter () {},
  onExit () {}
}

export default Transition;

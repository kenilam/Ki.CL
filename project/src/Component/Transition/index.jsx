// @flow
import React from 'react';
import { TransitionGroup } from 'react-transition-group';

import { CSSTransition } from 'Component';

import { classname } from './style';

const Transition = ({
  children,
  transitionKey,
  transitionStyle,
  onEnter = () => {},
  onEntered = () => {},
  onEntering = () => {},
  onExit = () => {},
  onExited = () => {},
  onExiting = () => {}
}) => (
  <TransitionGroup component={React.Fragment}>
    {CSSTransition({
      children,
      transitionKey,
      transitionStyle,
      onEnter(node) {
        onEnter(node);

        if (!node || !node.parentNode) {
          return;
        }

        node.parentNode.classList.add(classname);
      },
      onEntered(node) {
        onEntered(node);

        if (!node || !node.parentNode) {
          return;
        }

        node.parentNode.classList.remove(classname);
      },
      onEntering(node) {
        onEntering(node);
      },
      onExit(node) {
        onExit(node);

        if (!node || !node.parentNode) {
          return;
        }

        node.parentNode.classList.add(classname);
      },
      onExited(node) {
        onExited(node);

        if (!node || !node.parentNode) {
          return;
        }

        node.parentNode.classList.remove(classname);
      },
      onExiting(node) {
        onExiting(node);
      }
    })}
  </TransitionGroup>
);

export default Transition;

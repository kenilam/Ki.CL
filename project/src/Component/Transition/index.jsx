// @flow
import React from 'react';
import { TransitionGroup } from 'react-transition-group';

import { CSSTransition } from 'Component';

import { className } from './style.scss';

const Transition = ({ 
  children,
  transitionKey,
  transitionStyle,
  onEnter = () => {},
  onEntered = () => {},
  onExit = () => {},
  onExited = () => {}
}) => (
  <TransitionGroup component={React.Fragment}>
    {
      CSSTransition({
        children,
        transitionKey,
        transitionStyle,
        onEnter(node) {
          onEnter(node);

          if (!node || !node.parentNode) {
            return;
          }

          node.parentNode.classList.add(className);
        },
        onEntered(node) {
          onEntered(node);

          if (!node || !node.parentNode) {
            return;
          }

          node.parentNode.classList.remove(className);
        },
        onExit(node) {
          onExit(node);

          if (!node || !node.parentNode) {
            return;
          }

          node.parentNode.classList.add(className);
        },
        onExited(node) {
          onExited(node);

          if (!node || !node.parentNode) {
            return;
          }

          node.parentNode.classList.remove(className);
        }
      })
    }
  </TransitionGroup>
);

export default Transition;

import * as React from 'react';
import { TransitionGroup } from 'react-transition-group';

import { CSSTransition } from '@Component';

import { ITransition } from './typings';

const Transition: React.FunctionComponent<ITransition> = ({ children, transitionKey }) => (
  <TransitionGroup>
    {CSSTransition({ children, transitionKey })}
  </TransitionGroup>
);

export default Transition;

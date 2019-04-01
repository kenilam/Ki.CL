import * as React from 'react';
import { TransitionGroup } from 'react-transition-group';
import classnames from 'classnames';

import { CSSTransition } from '@Component';

import { IProps } from './spec';

import { childClassName, className } from './Style';

const Transition: React.FunctionComponent<IProps> = ({
  appear,
  classNames,
  children,
  component,
  onEnter,
  onEntered,
  onEntering,
  onExit,
  onExited,
  onExiting,
  transitionIn,
  transitionKey
}) => (
  <TransitionGroup
    className={classnames(classNames, className)}
    component={component}
  >
    {CSSTransition({
      appear,
      classNames: childClassName,
      children,
      onEnter,
      onEntered,
      onEntering,
      onExit,
      onExited,
      onExiting,
      transitionIn,
      transitionKey
    })}
  </TransitionGroup>
);

export default Transition;

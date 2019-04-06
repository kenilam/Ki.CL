import {CSSTransition} from '@Component';
import classnames from 'classnames';
import * as React from 'react';
import {TransitionGroup} from 'react-transition-group';
import {IProps} from './spec';
import Style from './Style';

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
    className={classnames(classNames, Style.transition)}
    component={component}
  >
    {CSSTransition({
      appear,
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

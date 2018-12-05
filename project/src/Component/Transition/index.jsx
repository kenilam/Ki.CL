// @flow
import React from 'react';
import classnames from 'classnames';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { addEndListener, parentClassNames, eventHanlder } from './Utilities';

import './style.scss';

type ClassName = {} | String | Array<ClassName>;

type Node = React.Node;

type TransitionEvent = (node: Node) => void;

type Props = {
  children: React.Node,
  className?: ClassName | Array<ClassName>,
  component?: React.Node | String,
  transitionKey: String,
  onEnter?: TransitionEvent,
  onEntered?: TransitionEvent,
  onExit?: TransitionEvent,
  onExited?: TransitionEvent
};

const { add, remove } = parentClassNames;

const Transition = ({
  children,
  className,
  component,
  transitionKey,
  onEnter,
  onEntered,
  onExit,
  onExited,
  ...rest
}: Props) => (
  <TransitionGroup { ...{ component } }>
    <CSSTransition { ...{
      classNames: classnames(className, Transition.defaultProps.className),
      addEndListener: addEndListener(),
      key: transitionKey,
      onEnter: eventHanlder({ middleware: add }),
      onEntered: eventHanlder({ event: 'entered', handler: onEntered, middleware: remove }),
      onExit: eventHanlder({ middleware: add }),
      onExited: eventHanlder({ event: 'exited', handler: onExited }),
      ...rest
    } }>
      { children }
    </CSSTransition>
  </TransitionGroup>
);

Transition.defaultProps = {
  className: 'css-transition',
  component: 'div',
  onEnter: () => {},
  onEntered: () => {},
  onExit: () => {},
  onExited: () => {}
}

export default Transition;

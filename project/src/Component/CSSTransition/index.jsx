// @flow
import React from 'react';
import { CSSTransition as Origin } from 'react-transition-group';
import classnames from 'classnames';

import { addEndListener, classList } from './Utilities';

import { className } from './style.scss';

type Node = React.Node;

type Props = {
  children: Node;
  
  transitionKey: String;
  transitionIn: Boolean;
  transitionStyle?: String;

  mountOnEnter?: Boolean;
  unmountOnExit?: Boolean;

  appear?: Boolean;

  onEnter?: (node: Node) => void;
  onEntered?: (node: Node) => void;
  onExit?: (node: Node) => void;
  onExited?: (node: Node) => void;
};

const CSSTransition = ({
  children,

  transitionKey,
  transitionIn,
  transitionStyle = CSSTransition.defaultProps.transitionStyle,

  mountOnEnter = CSSTransition.defaultProps.mountOnEnter,
  unmountOnExit = CSSTransition.defaultProps.unmountOnExit,

  appear = CSSTransition.defaultProps.appear,

  onEnter = CSSTransition.defaultProps.onEnter,
  onEntered = CSSTransition.defaultProps.onEntered,
  onExit = CSSTransition.defaultProps.onExit,
  onExited = CSSTransition.defaultProps.onExited
}: Props) => {
  const classNames = classnames(`${className}-style-${transitionStyle}`, className);

  return (
    <Origin
      classNames={ classNames }
      in={ transitionIn }
      key={ transitionKey }
      addEndListener={ addEndListener }
      mountOnEnter={ mountOnEnter }
      unmountOnExit={ unmountOnExit }
      appear={ appear }
      onEnter={ node => {
        onEnter(node);
        classList.add(node);
      } }
      onEntered={ node => {
        onEntered(node);
        classList.remove(node, transitionStyle);
      } }
      onExit={ node => {
        onExit(node);
        classList.add(node);
      } }
      onExited={ node => {
        onExited(node);
        classList.remove(node, transitionStyle);
      } }
    >
      { children }
    </Origin>
  );
}

CSSTransition.defaultProps = {
  transitionStyle: 'fade',

  mountOnEnter: true,
  unmountOnExit: true,

  appear: true,

  onEnter() {},
  onEntered() {},
  onExit() {},
  onExited() {}
}

export default CSSTransition;

// @flow
import React from 'react';
import { CSSTransition as Origin } from 'react-transition-group';
import classnames from 'classnames';

import { addEndListener, classList } from './Utilities';

import { classname, styleprefix } from './style';
import { style as fade } from './fade';
import { style as slide } from './slide';
import { style as slidedown } from './slidedown';
import { style as slideup } from './slideup';

type Node = React.Node;

type Props = {
  children: Node,

  transitionKey: String,
  transitionIn: Boolean,
  transitionStyle?: 'custom' | fade | slidedown | slideup,

  mountOnEnter?: Boolean,
  unmountOnExit?: Boolean,

  appear?: Boolean,

  onEnter?: (node: Node) => void,
  onEntered?: (node: Node) => void,
  onEntering?: (node: Node) => void,
  onExit?: (node: Node) => void,
  onExited?: (node: Node) => void,
  onExiting?: (node: Node) => void
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
  onEntering = CSSTransition.defaultProps.onEntering,
  onExit = CSSTransition.defaultProps.onExit,
  onExited = CSSTransition.defaultProps.onExited,
  onExiting = CSSTransition.defaultProps.onExiting
}: Props) => {
  const transitionStyles = transitionStyle
    .replace(/ /g, '')
    .split(',')
    .map(style => `${styleprefix}${style}`);

  const classNames = classnames(transitionStyles, classname);

  return (
    <Origin
      classNames={classNames}
      in={transitionIn}
      key={transitionKey}
      addEndListener={addEndListener}
      timeout={1200}
      mountOnEnter={mountOnEnter}
      unmountOnExit={unmountOnExit}
      appear={appear}
      onEnter={node => {
        onEnter({ node });
        classList.add(node);
      }}
      onEntered={node => {
        onEntered({ node });
        classList.remove(node);
      }}
      onEntering={node => {
        onEntering({ node });
      }}
      onExit={node => {
        onExit({ node });
        classList.add(node);
      }}
      onExited={node => {
        onExited({ node });
        classList.remove(node);
      }}
      onExiting={node => {
        onExiting({ node });
      }}
    >
      {children}
    </Origin>
  );
};

CSSTransition.defaultProps = {
  transitionStyle: 'custom',
  mountOnEnter: true,
  unmountOnExit: true,

  appear: true,

  onEnter() {},
  onEntered() {},
  onEntering() {},
  onExit() {},
  onExited() {},
  onExiting() {}
};

export { fade, slide, slidedown, slideup, styleprefix };
export default CSSTransition;

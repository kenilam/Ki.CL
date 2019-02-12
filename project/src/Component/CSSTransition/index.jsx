// @flow
import React from 'react';
import { CSSTransition as Origin } from 'react-transition-group';
import classnames from 'classnames';

import { addEndListener, classList } from './Utilities';

import { className, stylePrefix } from './style.scss';
import { style as fade } from './fade.scss';
import { style as slidedown } from './slidedown.scss';
import { style as slideup } from './slideup.scss';

type Node = React.Node;

type Props = {
  children: Node;
  
  transitionKey: String;
  transitionIn: Boolean;
  transitionStyle?: fade | slidedown | slideup;

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
  const classNames = transitionStyle? classnames(`${stylePrefix}${transitionStyle}`, className) : className;

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
        classList.remove(node);
      } }
      onExit={ node => {
        onExit(node);
        classList.add(node);

        if (!node) {
          return;
        }

        node.style.top = -window.kicl.ref.scrollTop;
      } }
      onExited={ node => {
        onExited(node);
        classList.remove(node);
      } }
    >
      { children }
    </Origin>
  );
}

CSSTransition.defaultProps = {
  transitionStyle: fade,
  mountOnEnter: true,
  unmountOnExit: true,

  appear: false,

  onEnter() {},
  onEntered() {},
  onExit() {},
  onExited() {}
}

export {
  fade,
  slidedown,
  slideup,
  stylePrefix
};
export default CSSTransition;

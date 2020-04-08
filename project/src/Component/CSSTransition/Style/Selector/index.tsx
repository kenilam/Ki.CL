import Core from '@/Component/CSSTransition/Core';
import classnames from 'classnames';
import React, { FunctionComponent } from 'react';
import ISelector from './spec';

const Selector: FunctionComponent<ISelector.Props> = ({
  children,
  classNames,
  onEntered,
  onExited,
  ...props
}) => {
  const className = classnames(classNames);

  const enteredHandler: ISelector.OnEnter = (node, isAppearing) => {
    if (node) {
      node.classList.remove(...className.split(' '));
    }

    if (onEntered) {
      onEntered(node, isAppearing);
    }
  };

  const exitedHandler: ISelector.OnExit = (node) => {
    if (node) {
      node.classList.remove(...className.split(' '));
    }

    if (onExited) {
      onExited(node);
    }
  };

  return (
    <Core
      {...props}
      classNames={classNames}
      onEntered={enteredHandler}
      onExited={exitedHandler}
    >
      {children}
    </Core>
  );
};

export default Selector;

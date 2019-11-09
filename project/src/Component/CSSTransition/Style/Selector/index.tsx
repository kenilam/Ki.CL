import Core from '@/Component/CSSTransition/Core';
import ICSSTransition from '@/Component/CSSTransition/Core/spec';
import classnames from 'classnames';
import React, {FunctionComponent} from 'react';
import ISelector from './spec';

const Selector: FunctionComponent<ISelector.Props> = ({
  children,
  classNames,
  onEntered,
  onExited,
  ...props
}) => {
  const className = classnames(classNames);
  
  const enteredHandler: ICSSTransition.OnEnter = (node, isAppearing) => {
    if (node) {
      node.classList.remove(...className.split(' '));
    }
    
    onEntered && onEntered(node, isAppearing);
  };
  
  const exitedHandler: ICSSTransition.OnExit = (node) => {
    if (node) {
      node.classList.remove(...className.split(' '));
    }
    
    onExited && onExited(node);
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

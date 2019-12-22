import {CSSTransition} from '@/Component';
import ICSSTransition from '@/Component/CSSTransition/spec';
import React, {useRef} from 'react';
import IInput from './spec';
import Style from './Style';

const Input: React.FunctionComponent<IInput.Props> = ({
  autoFocus,
  label,
  id,
  transitionIn,
  transitionType,
  mountOnEnter,
  onEnter,
  onEntering,
  onEntered: onEnteredHandler,
  onExit,
  onExiting,
  onExited,
  standAlone,
  unmountOnExit,
  ...props
}) => {
  const ref = useRef<HTMLInputElement>();
  
  const onEntered: ICSSTransition.OnEnter = (node, isAppearing) => {
    ref && ref.current.focus();
    onEnteredHandler && onEnteredHandler(node, isAppearing);
  };
  
  return (
    <CSSTransition
      in={transitionIn}
      mountOnEnter={mountOnEnter}
      onEnter={onEnter}
      onEntering={onEntering}
      onEntered={onEntered}
      onExit={onExit}
      onExiting={onExiting}
      onExited={onExited}
      standAlone={standAlone}
      type={transitionType}
      unmountOnExit={unmountOnExit}
    >
      <label htmlFor={id} data-component={Style.default}>
        <span>{label}</span>
        <input ref={ref} id={id} {...props} />
      </label>
    </CSSTransition>
  );
};

export default Input;

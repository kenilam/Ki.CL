import {CSSTransition} from '@/Component';
import ICSSTransition from '@/Component/CSSTransition/spec';
import React, {useRef} from 'react';
import IInput from './spec';
import Style from './Style';

const Input: React.FunctionComponent<IInput.Props> = ({
  autoFocus,
  id,
  in: transitionIn,
  label,
  onEntered: onEnteredHandler,
  onEntering,
  ...props
}) => {
  const ref = useRef<HTMLInputElement>();
  
  const onEntered: ICSSTransition.OnEnter = (node, isAppearing) => {
    autoFocus && ref && ref.current.focus();
    onEnteredHandler && onEnteredHandler(node, isAppearing);
  };
  
  return (
    <CSSTransition
      {...props}
      in={transitionIn}
      onEntered={onEntered}
      onEntering={onEntering}
    >
      <label htmlFor={id} data-component={Style.default}>
        <span>{label}</span>
        <input {...props} ref={ref} id={id} name={id} />
      </label>
    </CSSTransition>
  );
};

export default Input;

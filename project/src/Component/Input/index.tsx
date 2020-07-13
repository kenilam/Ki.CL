import { CSSTransition } from '@/Component'
import React, { useRef } from 'react';
import Style from './Style';
import { Enter, Props } from './spec';

const Input: React.FunctionComponent<Props> = ({
  autoFocus,
  className,
  id,
  in: transitionIn,
  label,
  onEntered: onEnteredHandler,
  transitionType,
  ...props
}) => {
  const ref = useRef<HTMLInputElement>();

  const onEntered: Enter = (node, isAppearing) => {
    if (autoFocus && ref) {
      ref.current.focus();
    }

    if (onEnteredHandler) {
      onEnteredHandler(node, isAppearing);
    }
  };

  return (
    <CSSTransition
      {...props}
      in={transitionIn}
      onEntered={onEntered}
      type={transitionType}
    >
      <label className={className} data-component={Style.default} htmlFor={id}>
        <span>{label}</span>
        <input {...props} ref={ref} id={id} name={id} />
      </label>
    </CSSTransition>
  );
};

export default Input;

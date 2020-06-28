import { CSSTransition } from '@/Components';
import classnames from 'classnames';
import React, { useRef } from 'react';
import Style from './Style';
import Spec from './spec';

const TextArea: React.FunctionComponent<Spec.Props> = ({
  autoFocus,
  in: transitionIn,
  id,
  label,
  maxLength,
  minLength,
  onEntered: onEnteredHandler,
  onEntering,
  resizable,
  transitionType,
  ...props
}) => {
  const ref = useRef<HTMLTextAreaElement>();

  const onEntered: Spec.Enter = (node, isAppearing) => {
    if (autoFocus && ref) {
      ref.current.focus();
    }
    if (onEnteredHandler) {
      onEnteredHandler(node, isAppearing);
    }
  };

  const className = classnames({ [Style.resizable]: resizable });

  return (
    <CSSTransition
      {...props}
      in={transitionIn}
      onEntering={onEntering}
      onEntered={onEntered}
      type={transitionType}
    >
      <label
        {...props}
        className={className}
        data-component={Style.default}
        htmlFor={id}
      >
        <span>{label}</span>
        <textarea
          {...props}
          id={id}
          maxLength={maxLength}
          minLength={minLength}
          name={id}
          ref={ref}
        />
      </label>
    </CSSTransition>
  );
};

export default TextArea;

import {CSSTransition} from '@/Component';
import ICSSTransition from '@/Component/CSSTransition/spec';
import classnames from 'classnames';
import React, {useRef} from 'react';
import ITextArea from './spec';
import Style from './Style';

const TextArea: React.FunctionComponent<ITextArea.Props> = ({
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
  let ref = useRef<HTMLTextAreaElement>();
  
  const onEntered: ICSSTransition.OnEnter = (node, isAppearing) => {
    autoFocus && ref && ref.current.focus();
    onEnteredHandler && onEnteredHandler(node, isAppearing);
  };
  
  const className = classnames({[Style.resizable]: resizable});
  
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

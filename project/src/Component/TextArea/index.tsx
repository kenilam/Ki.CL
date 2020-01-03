import {CSSTransition} from '@/Component';
import ICSSTransition from '@/Component/CSSTransition/spec';
import classnames from 'classnames';
import React, {useRef} from 'react';
import ITextArea from './spec';
import Style from './Style';

const TextArea: React.FunctionComponent<ITextArea.Props> = ({
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
  resizable,
  standAlone,
  unmountOnExit,
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
      <label className={className} data-component={Style.default} htmlFor={id}>
        <span>{label}</span>
        <textarea id={id} ref={ref} {...props} />
      </label>
    </CSSTransition>
  );
};

export default TextArea;

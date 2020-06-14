import { CSSTransition } from "@/Components";
import React, { useRef } from "react";
import Style from "./Style";
import Spec from "./spec";

const Input: React.FunctionComponent<Spec.Props> = ({
  autoFocus,
  className,
  id,
  in: transitionIn,
  label,
  onEntered: onEnteredHandler,
  onEntering,
  transitionType,
  ...props
}) => {
  const ref = useRef<HTMLInputElement>();

  const onEntered: Spec.Enter = (node, isAppearing) => {
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
      onEntering={onEntering}
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

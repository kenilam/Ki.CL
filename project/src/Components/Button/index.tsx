import { CSSTransition } from "@/Components";
import React, { useRef } from "react";
import Style from "./Style";
import Spec from "./spec";

const Button: React.FunctionComponent<Spec.Props> = ({
  autoFocus,
  children,
  className,
  id,
  in: transitionIn,
  label,
  onEntered: onEnteredHandler,
  transitionType,
  type,
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
      type={transitionType}
    >
      <button
        className={className}
        data-component={Style.default}
        ref={ref}
        type={type}
      >
        {children}
      </button>
    </CSSTransition>
  );
};

export default Button;

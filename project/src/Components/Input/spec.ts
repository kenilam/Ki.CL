import CSSTransition from "@/Components/CSSTransition/spec";
import React from "react";

declare namespace Spec {
  type ClassName = ClassNames<"default">;

  type Enter = CSSTransition.Enter;

  type Props = React.InputHTMLAttributes<null> &
    Omit<CSSTransition.Props, "type"> & {
      label?: string;
      transitionType?: CSSTransition.Type;
    };
}

export default Spec;

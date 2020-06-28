import { Omit } from "@/spec.helpers";
import { Key } from "react";
import {
  CSSTransitionClassNames,
  CSSTransitionProps,
} from "react-transition-group/CSSTransition";
import {
  EndHandler,
  EnterHandler,
  ExitHandler,
} from "react-transition-group/Transition";
import Origin from "./Type/spec";

declare namespace Spec {
  type ClassName = CSSTransitionClassNames &
    ClassNames<"default" | "standalone">;

  type Enter = EnterHandler<null>;
  type Exit = ExitHandler<null>;

  type AddEndListener = EndHandler<null>;

  type In = boolean;

  type Type = Origin.Type;

  type Props = Omit<CSSTransitionProps, "addEndListener"> & {
    addEndListener?: AddEndListener;
    standalone?: boolean;
    transitionKey?: Key;
    type?: Type;
  };

  type UseHandlersProps = {
    addEndListener?: AddEndListener;
    onEntered: Enter;
    onExited: Exit;
    type: Type;
  };

  type UseHandlers = (
    props: UseHandlersProps
  ) => { onEntered: Enter; onExited: Exit };
}

export default Spec;

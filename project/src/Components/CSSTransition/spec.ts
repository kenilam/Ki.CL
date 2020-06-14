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

  type Enter = EnterHandler;
  type Exit = ExitHandler;

  type In = boolean;

  type Type = Origin.Type;

  type Props = Omit<CSSTransitionProps, "addEndListener"> & {
    addEndListener?: EndHandler;
    standalone?: boolean;
    transitionKey?: Key;
    type?: Type;
  };
}

export default Spec;

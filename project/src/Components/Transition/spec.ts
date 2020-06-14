import CSSTransition from "@/Components/CSSTransition/spec";
import { TransitionGroupProps } from "react-transition-group/TransitionGroup";

declare namespace Spec {
  type ClassName = ClassNames<"default">;

  type Enter = CSSTransition.Enter;
  type Exit = CSSTransition.Exit;

  type Props = TransitionGroupProps & CSSTransition.Props;
}

export default Spec;

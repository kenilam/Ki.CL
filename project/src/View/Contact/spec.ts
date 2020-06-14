import CSSTransition from "@/Components/CSSTransition/spec";
import State from "./State/spec";

declare namespace Spec {
  type ClassName = ClassNames<"loading">;

  type Actions = State.Actions;
  type Type = CSSTransition.Type;
  type Props = {};
}

export default Spec;

import CSSTransition from "@/Components/CSSTransition/spec";

declare namespace Spec {
  type ClassName = ClassNames<"default">;

  type TransitionTypes = {
    [path: string]: CSSTransition.Type;
  };

  interface Props {}
}

export default Spec;

import CSSTransition from "@/Components/CSSTransition/spec";
import { Omit } from "@/spec.helpers";

declare namespace Spec {
  type ClassName = ClassNames<"default">;

  type Props = Omit<CSSTransition.Props, "type">;
}

export default Spec;

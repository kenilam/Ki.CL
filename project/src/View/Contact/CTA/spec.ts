import CSSTransition from "@/Components/CSSTransition/spec";

declare namespace Spec {
  type ClassName = ClassNames<"default">;

  type Props = Omit<CSSTransition.Props, "type"> & {
    disabled: boolean;
  };
}

export default Spec;

import CSSTransition from "@/Components/CSSTransition/spec";

declare namespace Spec {
  type ClassName = ClassNames<"default" | "withoverlay">;

  type Props = CSSTransition.Props & {
    withOverlay?: boolean;
  };
}

export default Spec;

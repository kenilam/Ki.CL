declare namespace Spec {
  type ClassName = ClassNames<"default" | "square">;

  interface Props {
    isSquare?: boolean;
  }
}

export default Spec;

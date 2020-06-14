declare namespace Spec {
  type ClassName = ClassNames<
    | "default"
    | "lowerShadowColor"
    | "lowerShadowDistance"
    | "upperShadowColor"
    | "upperShadowDistance"
  >;

  type Word = {
    word: string;
    render: boolean;
  };

  type Props = {
    words: Spec.Word[];
  };
}

export default IPhase;

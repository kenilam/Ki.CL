import IPhase from "@/View/Home/Phase/spec";

declare namespace Spec {
  type ClassName = ClassNames<"default">;
  type Words = (IPhase.Word[] | string)[];

  interface Props {}
}

export default Spec;

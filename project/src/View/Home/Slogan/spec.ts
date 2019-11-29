import IPhase from "@/View/Home/Phase/spec";

declare module ISlogan {
  interface ClassNames extends IClassNames {
    default: string;
  }
  
  type Words = (IPhase.Word[] | string)[];
  
  interface Props {
  }
}

export default ISlogan;

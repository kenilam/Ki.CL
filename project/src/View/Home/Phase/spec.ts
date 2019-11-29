declare module IPhase {
  interface ClassNames extends IClassNames {
    default: string;
    lowerShadowColor: string;
    lowerShadowDistance: string;
    upperShadowColor: string;
    upperShadowDistance: string;
  }
  
  interface Word {
    word: string;
    render: boolean;
  }
  
  interface Props {
    words:  IPhase.Word[]
  }
}

export default IPhase;

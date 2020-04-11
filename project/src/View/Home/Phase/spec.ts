declare namespace IPhase {
  type ClassNames = IClassNames<
    | 'default'
    | 'lowerShadowColor'
    | 'lowerShadowDistance'
    | 'upperShadowColor'
    | 'upperShadowDistance'
  >;

  interface Word {
    word: string;
    render: boolean;
  }

  interface Props {
    words: IPhase.Word[];
  }
}

export default IPhase;

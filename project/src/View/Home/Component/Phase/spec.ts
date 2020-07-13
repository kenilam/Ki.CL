export type ClassName = ClassNames<
  | 'default'
  | 'lowerShadowColor'
  | 'lowerShadowDistance'
  | 'upperShadowColor'
  | 'upperShadowDistance'
>;

export type Word = {
  word: string;
  render: boolean;
};

export type Props = {
  words: Word[];
};

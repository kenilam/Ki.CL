type Is = Extract<
  keyof JSX.IntrinsicElements,
  'h1' | 'h2' | 'h3' | 'h4' | 'h6'
>;

type HTMLAttributes = JSX.IntrinsicElements[Is];

export type Props = HTMLAttributes & {
  is?: Is;
};

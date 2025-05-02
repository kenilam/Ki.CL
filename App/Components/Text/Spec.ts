import { HTMLAttributes, JSX, PropsWithChildren } from 'react';

type Is = Extract<keyof JSX.IntrinsicElements, 'p' | 'span'>;

type LookLike = Extract<
  keyof JSX.IntrinsicElements,
  'h1' | 'h2' | 'h3' | 'h3' | 'h4' | 'h5' | 'h6'
>;

type Variant = 'primary' | 'secondary';

export type TextNode = HTMLParagraphElement & HTMLSpanElement;

export type Props = Required<PropsWithChildren> &
  HTMLAttributes<TextNode> & {
    dense?: boolean;
    is?: Is;
    lookLike?: LookLike;
    variant?: Variant;
  };

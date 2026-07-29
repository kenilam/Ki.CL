import type { JSX, PropsWithChildren } from 'react';

import type { PolymorphicIsProps } from '@/Components/polymorphic';

/** Semantic hosts that read as body / quote copy. */
export type TextIs = Extract<
  keyof JSX.IntrinsicElements,
  'blockquote' | 'cite' | 'p' | 'q' | 'span'
>;

type LookLike = Extract<
  keyof JSX.IntrinsicElements,
  'blockquote' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
>;

type Variant = 'primary' | 'secondary';

export type TextNode = HTMLElement;

type OwnProps = PropsWithChildren<{
  dense?: boolean;
  lookLike?: LookLike;
  unstyled?: boolean;
  variant?: Variant;
}>;

export type Props = PolymorphicIsProps<TextIs, OwnProps, 'p'>;

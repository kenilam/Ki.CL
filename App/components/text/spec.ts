import type { JSX, PropsWithChildren } from 'react';

import type { PolymorphicIsProps } from '@/components/polymorphic';

/** Semantic hosts for body copy, quotes and inline meaning (code, emphasis, dates). */
export type TextIs = Extract<
  keyof JSX.IntrinsicElements,
  | 'blockquote'
  | 'cite'
  | 'code'
  | 'em'
  | 'p'
  | 'pre'
  | 'q'
  | 'span'
  | 'strong'
  | 'time'
>;

type LookLike = Extract<
  keyof JSX.IntrinsicElements,
  'blockquote' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
>;

/** `secondary` dims the text, accent included. Leave it out for full strength. */
type Variant = 'secondary';

/** Functional colour from the palette. Inline code tints its fill to match. */
export type TextAccent = 'confirm' | 'error' | 'info' | 'warning';

export type TextNode = HTMLElement;

type OwnProps = PropsWithChildren<{
  accent?: TextAccent;
  dense?: boolean;
  lookLike?: LookLike;
  unstyled?: boolean;
  variant?: Variant;
}>;

export type Props = PolymorphicIsProps<TextIs, OwnProps, 'p'>;

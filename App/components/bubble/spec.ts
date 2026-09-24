import type { ReactNode } from 'react';

import type { PolymorphicIsProps } from '@/components/polymorphic';

export const BUBBLE_VARIANTS = [
  'default',
  'secondary',
  'muted',
  'tinted',
  'outline',
  'ghost',
  'destructive',
] as const;

export type BubbleVariant = (typeof BUBBLE_VARIANTS)[number];

/** Which end of the line the bubble sits at. */
export type BubbleAlign = 'start' | 'end';

export type BubbleReactionsSide = 'top' | 'bottom';

/** Semantic hosts for one message. */
export type BubbleIs = 'article' | 'div' | 'li' | 'section';

/** The text surface; `a` and `button` make the whole bubble a control. */
export type BubbleContentIs =
  'a' | 'blockquote' | 'button' | 'div' | 'p' | 'span';

/** Consecutive messages from one sender. */
export type BubbleGroupIs = 'div' | 'li' | 'ol' | 'section' | 'ul';

export type BubbleReactionsIs = 'div' | 'ul';

type Children = {
  children?: ReactNode;
};

export type BubbleProps = PolymorphicIsProps<
  BubbleIs,
  Children & {
    /** Visual style - mirrors [shadcn Bubble](https://ui.shadcn.com/docs/components/base/bubble). */
    variant?: BubbleVariant;
    align?: BubbleAlign;
  },
  'div'
>;

export type BubbleContentProps = PolymorphicIsProps<
  BubbleContentIs,
  Children,
  'div'
>;

export type BubbleGroupProps = PolymorphicIsProps<
  BubbleGroupIs,
  Children,
  'div'
>;

export type BubbleReactionsProps = PolymorphicIsProps<
  BubbleReactionsIs,
  Children & {
    align?: BubbleAlign;
    side?: BubbleReactionsSide;
  },
  'div'
>;

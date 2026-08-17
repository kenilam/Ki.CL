import type { ReactNode } from 'react';

import type { PolymorphicIsProps } from '@/Components/polymorphic';

/** `default` = full width; named sizes map to `kicl-inline-size-*`. */
export const CARD_SIZES = [
  'default',
  'xs',
  'sm',
  'md',
  'lg',
  'xl',
  'xxl',
  'max',
] as const;

export type CardSize = (typeof CARD_SIZES)[number];

/**
 * `default` paints the surface; `ghost` lets what is behind it through.
 *
 * Named to match `Badge` and `Button`, which already use `ghost` for the
 * translucent, blurred treatment - one word for one idea across the library.
 */
export type CardVariant = 'default' | 'ghost';

/** Semantic hosts that read as a card / panel surface. */
export type CardIs = 'article' | 'aside' | 'div' | 'form' | 'li' | 'section';

/** Title hosts - headings or generic text containers. */
export type CardTitleIs =
  'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';

export type CardDescriptionIs = 'div' | 'p' | 'span';

export type CardSectionIs = 'div' | 'footer' | 'header' | 'section';

type CardOwnProps = {
  /**
   * Width scale - `default` fills the parent; `xs`…`max` apply `kicl-inline-size-*`.
   * `xs` / `sm` also tighten spacing (shadcn-style density).
   */
  size?: CardSize;
  variant?: CardVariant;
  children?: ReactNode;
};

type SectionOwnProps = {
  children?: ReactNode;
};

export type CardProps = PolymorphicIsProps<CardIs, CardOwnProps, 'div'>;

export type CardHeaderProps = PolymorphicIsProps<
  CardSectionIs,
  SectionOwnProps,
  'div'
>;

export type CardTitleProps = PolymorphicIsProps<
  CardTitleIs,
  SectionOwnProps,
  'div'
>;

export type CardDescriptionProps = PolymorphicIsProps<
  CardDescriptionIs,
  SectionOwnProps,
  'p'
>;

export type CardActionProps = PolymorphicIsProps<
  CardSectionIs,
  SectionOwnProps,
  'div'
>;

export type CardContentProps = PolymorphicIsProps<
  CardSectionIs,
  SectionOwnProps,
  'div'
>;

export type CardFooterProps = PolymorphicIsProps<
  CardSectionIs,
  SectionOwnProps,
  'div'
>;

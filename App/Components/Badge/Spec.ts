import type { JSX, ReactNode } from 'react';

import type { PolymorphicIsProps } from '@/Components/polymorphic';

export const BADGE_VARIANTS = [
  'default',
  'secondary',
  'destructive',
  'outline',
  'ghost',
] as const;

export type BadgeVariant = (typeof BADGE_VARIANTS)[number];

export const BADGE_SIZES = ['small', 'large'] as const;

/**
 * A step down or up the gutter scale from the default chip.
 *
 * Undefined is the default size - the prop names the departure from it rather
 * than restating it, so a chip with no `size` needs no class at all.
 */
export type BadgeSize = (typeof BADGE_SIZES)[number];

/** Semantic hosts that read as a badge / chip / tag. */
export type BadgeIs =
  'a' | 'abbr' | 'button' | 'div' | 'li' | 'mark' | 'span' | 'time';

type OwnProps = {
  /** Visual style - mirrors [shadcn Badge](https://ui.shadcn.com/docs/components/base/badge). */
  variant?: BadgeVariant;
  /** One gutter step down (`small`) or up (`large`) from the default padding. */
  size?: BadgeSize;
  children?: ReactNode;
};

export type Props = PolymorphicIsProps<BadgeIs, OwnProps, 'span'>;

export type BadgeLabelProps = JSX.IntrinsicElements['span'] & {
  children?: ReactNode;
};

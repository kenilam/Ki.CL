import type { JSX, ReactNode } from 'react';

import type { Props as ButtonProps } from '@/components/button/spec';
import type { PolymorphicIsProps } from '@/components/polymorphic';

export const BADGE_VARIANTS = [
  'default',
  'secondary',
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
  /** How it looks: filled, a quieter fill, an outline, or no chrome at all. */
  variant?: BadgeVariant;
  /**
   * What it means, as on `Button`: fills the chip with that colour, or edges
   * it for `outline` and `ghost`, which have no fill.
   */
  level?: ButtonProps['level'];
  /** One gutter step down (`small`) or up (`large`) from the default padding. */
  size?: BadgeSize;
  children?: ReactNode;
};

export type Props = PolymorphicIsProps<BadgeIs, OwnProps, 'span'> & {
  rounded?: boolean;
};

export type BadgeLabelProps = JSX.IntrinsicElements['span'] & {
  children?: ReactNode;
};

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

/** Semantic hosts that read as a badge / chip / tag. */
export type BadgeIs =
  | 'a'
  | 'abbr'
  | 'button'
  | 'div'
  | 'li'
  | 'mark'
  | 'span'
  | 'time';

type OwnProps = {
  /** Visual style — mirrors [shadcn Badge](https://ui.shadcn.com/docs/components/base/badge). */
  variant?: BadgeVariant;
  children?: ReactNode;
};

export type Props = PolymorphicIsProps<BadgeIs, OwnProps, 'span'>;

export type BadgeLabelProps = JSX.IntrinsicElements['span'] & {
  children?: ReactNode;
};

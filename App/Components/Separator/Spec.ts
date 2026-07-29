import type { HTMLAttributes } from 'react';

export const SEPARATOR_ORIENTATIONS = ['horizontal', 'vertical'] as const;

export type SeparatorOrientation = (typeof SEPARATOR_ORIENTATIONS)[number];

/**
 * Visual or semantic divider — API aligned with
 * https://ui.shadcn.com/docs/components/separator
 */
export type Props = HTMLAttributes<HTMLDivElement> & {
  /** When true (default), purely visual — `role='none'`. */
  decorative?: boolean;
  orientation?: SeparatorOrientation;
};

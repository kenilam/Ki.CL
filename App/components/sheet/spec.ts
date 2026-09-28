import type { ComponentPropsWithoutRef } from 'react';

import type { CardVariant } from '@/components/card/spec';
import type { ColumnSpan } from '@/components/layout/spec';

/**
 * Starts open when `defaultOpen`; after that its own buttons open and close
 * it, through `popovertarget`, and `onOpenChange` reports each change. `size`
 * is how many columns wide it is beside the page.
 */
export type SheetProps = Omit<ComponentPropsWithoutRef<'aside'>, 'popover'> & {
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  size?: ColumnSpan;
  variant?: CardVariant;
};

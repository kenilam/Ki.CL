import type { ComponentPropsWithoutRef, ReactNode } from 'react';

import type { PopoverContentProps } from '@/components/popover/spec';

export type ComboboxProps = ComponentPropsWithoutRef<'div'> & {
  /** Controlled: the panel shows while this is true. */
  open: boolean;
  /** Asked to close - Escape, or focus leaving both the field and the panel. */
  onOpenChange: (open: boolean) => void;
  children?: ReactNode;
};

export type ComboboxAnchorProps = ComponentPropsWithoutRef<'div'>;

/** Needs a name: pass `aria-label` or `aria-labelledby`. */
export type ComboboxContentProps = Omit<
  PopoverContentProps,
  'popover' | 'role'
>;

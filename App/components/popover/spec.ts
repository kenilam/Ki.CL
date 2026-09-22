import type { ComponentPropsWithoutRef, ReactNode } from 'react';

export type PopoverProps = ComponentPropsWithoutRef<'div'> & {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  children?: ReactNode;
};

export type PopoverTriggerProps = ComponentPropsWithoutRef<'button'> & {
  asChild?: boolean;
};

/**
 * Which side of the trigger the panel opens on.
 *
 * A preference rather than an instruction: whichever side is asked for, the
 * panel flips to the opposite one when there is no room, so a picker near the
 * foot of the window opens upward instead of off the screen.
 */
export type PopoverPlacement =
  'block-end' | 'block-start' | 'inline-start' | 'inline-end';

/** Matches `Card` and `Badge`: `ghost` is the translucent, blurred pane. */
export type PopoverVariant = 'default' | 'ghost';

/** Named by the trigger's text by default; pass `aria-label` or `aria-labelledby` to override. */
export type PopoverContentProps = ComponentPropsWithoutRef<'div'> & {
  placement?: PopoverPlacement;
  variant?: PopoverVariant;
};

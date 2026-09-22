import type React from 'react';

export const SWITCH_SIZES = ['default', 'sm'] as const;

export type SwitchSize = (typeof SWITCH_SIZES)[number];

export type Props = Omit<
  React.ComponentPropsWithoutRef<'input'>,
  'checked' | 'defaultChecked' | 'role' | 'size' | 'type'
> & {
  checked?: boolean;
  defaultChecked?: boolean;
  /** Visible label - same as nesting {@link SwitchLabel}. */
  label?: React.ReactNode;
  onCheckedChange?: (checked: boolean) => void;
  size?: SwitchSize;
};

export type SwitchLabelProps = React.ComponentPropsWithoutRef<'span'>;

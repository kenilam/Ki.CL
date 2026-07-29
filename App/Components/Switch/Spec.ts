import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from 'react';

export const SWITCH_SIZES = ['default', 'sm'] as const;

export type SwitchSize = (typeof SWITCH_SIZES)[number];

export type Props = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'onChange' | 'role' | 'type'
> & {
  checked?: boolean;
  children?: ReactNode;
  defaultChecked?: boolean;
  /** Visible label — same as nesting {@link SwitchLabel}. */
  label?: ReactNode;
  onCheckedChange?: (checked: boolean) => void;
  size?: SwitchSize;
};

export type SwitchLabelProps = HTMLAttributes<HTMLSpanElement>;

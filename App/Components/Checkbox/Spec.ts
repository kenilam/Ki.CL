import type { ButtonHTMLAttributes } from 'react';

export type CheckedState = boolean | 'indeterminate';

export type Props = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'onChange' | 'role' | 'type'
> & {
  checked?: CheckedState;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
};

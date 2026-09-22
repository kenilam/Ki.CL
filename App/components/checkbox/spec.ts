import type React from 'react';

export type CheckedState = boolean | 'indeterminate';

export type Props = Omit<
  React.ComponentPropsWithoutRef<'input'>,
  'checked' | 'defaultChecked' | 'type'
> & {
  checked?: CheckedState;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
};

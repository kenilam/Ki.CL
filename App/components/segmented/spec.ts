import type React from 'react';

export type SegmentedProps = Omit<
  React.ComponentPropsWithoutRef<'fieldset'>,
  'onChange' | 'defaultValue'
> & {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  /** Shared by every option, so the browser groups them. */
  name?: string;
};

export type SegmentedItemProps = Omit<
  React.ComponentPropsWithoutRef<'input'>,
  'checked' | 'defaultChecked' | 'name' | 'type' | 'value'
> & {
  value: string;
};

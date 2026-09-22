import type React from 'react';

export type RadioGroupProps = Omit<
  React.ComponentPropsWithoutRef<'fieldset'>,
  'onChange' | 'defaultValue'
> & {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  /** Visible group name, rendered as the `<legend>`. */
  legend?: React.ReactNode;
  /** Shared by every radio, so the browser groups them. */
  name?: string;
  required?: boolean;
};

export type RadioGroupItemProps = Omit<
  React.ComponentPropsWithoutRef<'input'>,
  'checked' | 'defaultChecked' | 'name' | 'type' | 'value'
> & {
  value: string;
};

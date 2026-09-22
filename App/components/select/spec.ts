import type React from 'react';

export type SelectProps = Omit<
  React.ComponentPropsWithoutRef<'select'>,
  'multiple' | 'size'
> & {
  onValueChange?: (value: string) => void;
  /** Shown while nothing is chosen; also makes `required` meaningful. */
  placeholder?: string;
};

export type SelectTriggerProps = React.ComponentPropsWithoutRef<'button'>;

export type SelectValueProps = React.HTMLAttributes<HTMLElement>;

export type SelectContentProps = { children?: React.ReactNode };

export type SelectItemProps = Omit<
  React.ComponentPropsWithoutRef<'option'>,
  'value'
> & {
  value: string;
};

export type SelectGroupProps = React.ComponentPropsWithoutRef<'optgroup'>;

export type SelectLabelProps = { children: string };

export type SelectSeparatorProps = React.ComponentPropsWithoutRef<'hr'>;

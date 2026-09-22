import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from 'react';

export type RadioGroupProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  'onChange' | 'defaultValue'
> & {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
  name?: string;
  children?: ReactNode;
};

export type RadioGroupItemProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'onChange' | 'role' | 'type' | 'value'
> & {
  value: string;
};

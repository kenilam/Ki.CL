import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from 'react';

export type SelectProps = {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
  name?: string;
  children?: ReactNode;
  className?: string;
};

export type SelectTriggerProps = ButtonHTMLAttributes<HTMLButtonElement>;

export type SelectValueProps = HTMLAttributes<HTMLSpanElement> & {
  placeholder?: string;
};

export type SelectContentProps = HTMLAttributes<HTMLDivElement>;

export type SelectItemProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'value'
> & {
  value: string;
  children?: ReactNode;
};

export type SelectGroupProps = HTMLAttributes<HTMLDivElement>;

export type SelectLabelProps = HTMLAttributes<HTMLDivElement>;

export type SelectSeparatorProps = HTMLAttributes<HTMLHRElement>;

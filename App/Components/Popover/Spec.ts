import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from 'react';

export type PopoverProps = HTMLAttributes<HTMLDivElement> & {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  children?: ReactNode;
};

export type PopoverTriggerProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  asChild?: boolean;
};

export type PopoverContentProps = HTMLAttributes<HTMLDivElement>;

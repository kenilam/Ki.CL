import type {
  ButtonHTMLAttributes,
  HTMLAttributes,
  InputHTMLAttributes,
  ReactNode,
  TextareaHTMLAttributes,
} from 'react';

export type InputGroupAlign =
  | 'inline-start'
  | 'inline-end'
  | 'block-start'
  | 'block-end';

export type InputGroupProps = HTMLAttributes<HTMLDivElement> & {
  children?: ReactNode;
};

export type InputGroupAddonProps = HTMLAttributes<HTMLDivElement> & {
  align?: InputGroupAlign;
};

export type InputGroupButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  size?: 'xs' | 'sm' | 'icon-xs' | 'icon-sm';
  variant?:
    | 'default'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | 'destructive'
    | 'link';
};

export type InputGroupInputProps = InputHTMLAttributes<HTMLInputElement>;

export type InputGroupTextareaProps =
  TextareaHTMLAttributes<HTMLTextAreaElement>;

export type InputGroupTextProps = HTMLAttributes<HTMLSpanElement>;

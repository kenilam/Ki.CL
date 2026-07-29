import type {
  ControllerProps,
  FieldPath,
  FieldValues,
  UseFormReturn,
} from 'react-hook-form';
import type {
  HTMLAttributes,
  LabelHTMLAttributes,
  PropsWithChildren,
} from 'react';

export type FormProps<TFieldValues extends FieldValues> = PropsWithChildren<
  UseFormReturn<TFieldValues>
> & {
  className?: string;
  onSubmit?: HTMLAttributes<HTMLFormElement>['onSubmit'];
};

export type FormFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = ControllerProps<TFieldValues, TName>;

export type FormItemProps = HTMLAttributes<HTMLDivElement>;

export type FormLabelProps = LabelHTMLAttributes<HTMLLabelElement> & {
  required?: boolean;
};

export type FormControlProps = PropsWithChildren<{
  className?: string;
}>;

export type FormDescriptionProps = Omit<
  HTMLAttributes<HTMLParagraphElement>,
  'is'
>;

export type FormMessageProps = Omit<HTMLAttributes<HTMLParagraphElement>, 'is'>;

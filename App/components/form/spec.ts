import type {
  ControllerProps,
  FieldPath,
  FieldValues,
  UseFormReturn,
} from 'react-hook-form';
import type React from 'react';

/** The native `<form>` attributes Form passes through. */
type FormElementProps = Pick<
  React.ComponentPropsWithoutRef<'form'>,
  | 'action'
  | 'aria-describedby'
  | 'aria-label'
  | 'aria-labelledby'
  | 'autoComplete'
  | 'className'
  | 'id'
  | 'method'
  | 'name'
  | 'noValidate'
  | 'onSubmit'
>;

export type FormProps<TFieldValues extends FieldValues> =
  React.PropsWithChildren<UseFormReturn<TFieldValues>> & FormElementProps;

export type FormFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = ControllerProps<TFieldValues, TName>;

export type FormItemProps = React.ComponentPropsWithoutRef<'div'> & {
  /** Marks the control and label as required. */
  required?: boolean;
};

export type FormLabelProps = React.ComponentPropsWithoutRef<'label'> & {
  /** Defaults to the item's or field's `required`. */
  required?: boolean;
};

export type FormControlProps = React.PropsWithChildren<{
  className?: string;
}>;

export type FormDescriptionProps = Omit<
  React.ComponentPropsWithoutRef<'p'>,
  'is'
>;

export type FormMessageProps = Omit<React.ComponentPropsWithoutRef<'p'>, 'is'>;

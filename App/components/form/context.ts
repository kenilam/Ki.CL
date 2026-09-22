import { createContext, useContext } from 'react';
import type { FieldPath, FieldValues } from 'react-hook-form';

export type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName;
  /** From the field's `rules.required`. */
  required: boolean;
};

export const FormFieldContext = createContext<FormFieldContextValue | null>(
  null
);

export type FormItemContextValue = {
  id: string;
  required?: boolean;
};

export const FormItemContext = createContext<FormItemContextValue | null>(null);

export function useFormFieldContext() {
  const field = useContext(FormFieldContext);
  const item = useContext(FormItemContext);

  if (!field) {
    throw new Error('Form field primitives must be used within <FormField>');
  }

  if (!item) {
    throw new Error('Form field primitives must be used within <FormItem>');
  }

  return {
    name: field.name,
    id: item.id,
    required: item.required ?? field.required,
    formItemId: item.id,
    formDescriptionId: `${item.id}-description`,
    formMessageId: `${item.id}-message`,
  };
}

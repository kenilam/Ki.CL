import React from 'react';
import { Controller, type FieldPath, type FieldValues } from 'react-hook-form';

import { FormFieldContext } from './context';
import type { FormFieldProps } from './Spec';

function FormField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(props: FormFieldProps<TFieldValues, TName>) {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
}

export default FormField;

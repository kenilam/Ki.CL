import React from 'react';
import { useFormContext } from 'react-hook-form';

import { useFormFieldContext } from './context';
import type { FormControlProps } from './Spec';

const FormControl = ({ children }: FormControlProps) => {
  const { formItemId, formDescriptionId, formMessageId, name } =
    useFormFieldContext();
  const { getFieldState, formState } = useFormContext();
  const { error } = getFieldState(name, formState);

  const child = React.Children.only(children);
  if (!React.isValidElement(child)) {
    return null;
  }

  const describedBy =
    [formDescriptionId, error ? formMessageId : null]
      .filter(Boolean)
      .join(' ') || undefined;

  return React.cloneElement(
    child as React.ReactElement<Record<string, unknown>>,
    {
      id: formItemId,
      'aria-describedby': describedBy,
      'aria-invalid': error ? true : undefined,
    }
  );
};

export default FormControl;

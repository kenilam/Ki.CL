import React from 'react';
import { useFormContext } from 'react-hook-form';

import { useFormFieldContext } from './context';
import type { FormControlProps } from './spec';

type ControlProps = {
  'aria-describedby'?: string;
  required?: boolean;
};

/**
 * Gives its one child the item's id, `required`, `aria-invalid` and the
 * description/message ids, added to any `aria-describedby` it already has.
 */
const FormControl = ({ children }: FormControlProps) => {
  const { formItemId, formDescriptionId, formMessageId, name, required } =
    useFormFieldContext();
  const { getFieldState, formState } = useFormContext();
  const { error } = getFieldState(name, formState);

  const child = React.Children.only(children);
  if (!React.isValidElement<ControlProps>(child)) {
    return null;
  }

  const describedBy =
    [
      child.props['aria-describedby'],
      formDescriptionId,
      error ? formMessageId : null,
    ]
      .filter(Boolean)
      .join(' ') || undefined;

  return React.cloneElement(child, {
    id: formItemId,
    'aria-describedby': describedBy,
    'aria-invalid': error ? true : undefined,
    required: child.props.required ?? (required || undefined),
  } as ControlProps);
};

export { FormControl };

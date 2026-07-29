import React from 'react';
import classNames from 'classnames';
import { useFormContext } from 'react-hook-form';

import { useFormFieldContext } from './context';
import type { FormLabelProps } from './Spec';

const CLASS_NAME = 'kicl--components--form__label';

const FormLabel = React.forwardRef<HTMLLabelElement, FormLabelProps>(
  ({ className, required, children, ...rest }, ref) => {
    const { formItemId, name } = useFormFieldContext();
    const { getFieldState, formState } = useFormContext();
    const { error } = getFieldState(name, formState);

    return (
      <label
        ref={ref}
        className={classNames(
          CLASS_NAME,
          'kicl-font-size-small',
          'kicl-font-weight-bold',
          error ? 'kicl-color-error' : 'kicl-color-grey-darker',
          { [`${CLASS_NAME}--error`]: Boolean(error) },
          className
        )}
        htmlFor={formItemId}
        {...rest}
      >
        {children}
        {required ? (
          <span
            className={`${CLASS_NAME}__required kicl-color-error`}
            aria-hidden
          >
            *
          </span>
        ) : null}
      </label>
    );
  }
);

FormLabel.displayName = 'FormLabel';

export default FormLabel;

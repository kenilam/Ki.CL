import React from 'react';
import classNames from 'classnames';
import { useFormContext } from 'react-hook-form';

import Text from '@/Components/Text';

import { useFormFieldContext } from './context';
import type { FormMessageProps } from './Spec';

const CLASS_NAME = 'kicl--components--form__message';

const FormMessage = React.forwardRef<HTMLParagraphElement, FormMessageProps>(
  ({ className, children, ...rest }, ref) => {
    const { formMessageId, name } = useFormFieldContext();
    const { getFieldState, formState } = useFormContext();
    const { error } = getFieldState(name, formState);
    const body = error ? String(error.message ?? '') : children;

    if (!body) {
      return null;
    }

    return (
      <Text
        {...rest}
        ref={ref}
        is='p'
        id={formMessageId}
        className={classNames(
          CLASS_NAME,
          'kicl-font-size-smaller',
          'kicl-color-error',
          className
        )}
        role='alert'
      >
        {body}
      </Text>
    );
  }
);

FormMessage.displayName = 'FormMessage';

export default FormMessage;

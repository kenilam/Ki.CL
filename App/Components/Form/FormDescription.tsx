import React from 'react';
import classNames from 'classnames';

import Text from '@/Components/Text';

import { useFormFieldContext } from './context';
import type { FormDescriptionProps } from './Spec';

const CLASS_NAME = 'kicl--components--form__description';

const FormDescription = React.forwardRef<
  HTMLParagraphElement,
  FormDescriptionProps
>(({ className, ...rest }, ref) => {
  const { formDescriptionId } = useFormFieldContext();

  return (
    <Text
      {...rest}
      ref={ref}
      is='p'
      id={formDescriptionId}
      className={classNames(
        CLASS_NAME,
        'kicl-font-size-smaller',
        'kicl-color-grey-dark',
        className
      )}
    />
  );
});

FormDescription.displayName = 'FormDescription';

export default FormDescription;

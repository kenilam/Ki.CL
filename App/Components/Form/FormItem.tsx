import React, { useId } from 'react';
import classNames from 'classnames';

import { FormItemContext } from './context';
import type { FormItemProps } from './Spec';

const CLASS_NAME = 'kicl--components--form__item';

const FormItem = React.forwardRef<HTMLDivElement, FormItemProps>(
  ({ className, ...rest }, ref) => {
    const id = useId();

    return (
      <FormItemContext.Provider value={{ id }}>
        <div
          ref={ref}
          className={classNames(CLASS_NAME, className)}
          {...rest}
        />
      </FormItemContext.Provider>
    );
  }
);

FormItem.displayName = 'FormItem';

export default FormItem;

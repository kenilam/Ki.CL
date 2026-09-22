import React, { useId } from 'react';
import classNames from 'classnames';

import { Layout } from '@/components/layout';

import { FormItemContext } from './context';
import type { FormItemProps } from './spec';

const CLASS_NAME = 'kicl--components--form__item';

const FormItem = React.forwardRef<HTMLDivElement, FormItemProps>(
  ({ className, required, ...rest }, ref) => {
    const id = useId();

    return (
      <FormItemContext.Provider value={{ id, required }}>
        <Layout gap='narrowest'>
          <div
            ref={ref}
            className={classNames(CLASS_NAME, className)}
            {...rest}
          />
        </Layout>
      </FormItemContext.Provider>
    );
  }
);

FormItem.displayName = 'FormItem';

export { FormItem };

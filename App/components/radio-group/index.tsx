import React, { useId } from 'react';

// Libraries
import classNames from 'classnames';

// Components
import { Layout } from '@/components/layout';

// Spec
import type { RadioGroupProps } from './spec';

// Styles
import './styles.scss';

// Constants
import { CLASS_NAME } from './constants';

// Context
import { RadioGroupContext } from './context';

// Partials
import { RadioGroupItem } from './item';

/**
 * Mutually exclusive options as a native `<fieldset>` of radios - API aligned
 * with https://ui.shadcn.com/docs/components/base/radio-group
 *
 * `disabled` on the fieldset disables every radio inside it.
 */
const RadioGroup = React.forwardRef<HTMLFieldSetElement, RadioGroupProps>(
  (
    {
      children,
      className,
      defaultValue,
      legend,
      name,
      onValueChange,
      required,
      value,
      ...rest
    },
    ref
  ) => {
    const reactId = useId();

    return (
      <RadioGroupContext.Provider
        value={{
          defaultValue,
          name: name ?? reactId,
          onValueChange: (next) => onValueChange?.(next),
          required,
          value,
        }}
      >
        <Layout gap='narrower' justifyItems='start'>
          <fieldset
            ref={ref}
            data-slot='radio-group'
            className={classNames(CLASS_NAME, className)}
            {...rest}
          >
            {legend ? (
              <legend className={`${CLASS_NAME}__legend`}>{legend}</legend>
            ) : null}
            {children}
          </fieldset>
        </Layout>
      </RadioGroupContext.Provider>
    );
  }
);

RadioGroup.displayName = 'RadioGroup';

export type { RadioGroupProps, RadioGroupItemProps } from './spec';
export { RadioGroupItem, RadioGroup };

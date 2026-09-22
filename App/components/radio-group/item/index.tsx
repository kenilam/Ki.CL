import React from 'react';

// Libraries
import classNames from 'classnames';

// Components
import { Layout } from '@/components/layout';

// Spec
import type { RadioGroupItemProps } from '@/components/radio-group/spec';

// Styles
import './styles.scss';

// Constants
import { CLASS_NAME as RADIO_GROUP } from '@/components/radio-group/constants';

// Context
import { useRadioGroup } from '@/components/radio-group/context';

const CLASS_NAME = `${RADIO_GROUP}__item`;

/**
 * One native radio. Children are its visible label; the `<label>` wraps both
 * so clicking the text selects the radio.
 */
const RadioGroupItem = React.forwardRef<HTMLInputElement, RadioGroupItemProps>(
  ({ children, className, onChange, value, ...rest }, ref) => {
    const group = useRadioGroup();
    const isControlled = group.value !== undefined;

    return (
      <Layout
        display='inline-grid'
        autoFlow='column'
        alignItems='center'
        gap='narrower'
      >
        <label className={classNames(CLASS_NAME, className)}>
          <input
            ref={ref}
            type='radio'
            data-slot='radio-group-item'
            className={`${CLASS_NAME}__control`}
            name={group.name}
            value={value}
            required={group.required}
            checked={isControlled ? group.value === value : undefined}
            defaultChecked={
              isControlled ? undefined : group.defaultValue === value
            }
            onChange={(event) => {
              onChange?.(event);
              group.onValueChange(value);
            }}
            {...rest}
          />
          {children}
        </label>
      </Layout>
    );
  }
);

RadioGroupItem.displayName = 'RadioGroupItem';

export { RadioGroupItem };

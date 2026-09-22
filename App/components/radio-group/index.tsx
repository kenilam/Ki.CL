import React, { useId, useState } from 'react';

// Libraries
import classNames from 'classnames';

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
 * Mutually exclusive options - API aligned with
 * https://ui.shadcn.com/docs/components/base/radio-group
 */
const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  (
    {
      children,
      className,
      defaultValue,
      disabled,
      name,
      onValueChange,
      value,
      ...rest
    },
    ref
  ) => {
    const reactId = useId();
    const isControlled = value !== undefined;
    const [uncontrolled, setUncontrolled] = useState(defaultValue);
    const current = isControlled ? value : uncontrolled;

    const setValue = (next: string) => {
      if (disabled) {
        return;
      }
      if (!isControlled) {
        setUncontrolled(next);
      }
      onValueChange?.(next);
    };

    return (
      <RadioGroupContext.Provider
        value={{
          disabled,
          name: name ?? reactId,
          onValueChange: setValue,
          value: current,
        }}
      >
        <div
          ref={ref}
          role='radiogroup'
          data-slot='radio-group'
          className={classNames(CLASS_NAME, className)}
          {...rest}
        >
          {children}
        </div>
      </RadioGroupContext.Provider>
    );
  }
);

RadioGroup.displayName = 'RadioGroup';

export type { RadioGroupProps, RadioGroupItemProps } from './spec';
export { RadioGroupItem, RadioGroup };

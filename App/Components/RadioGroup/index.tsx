import React, { createContext, useContext, useId, useState } from 'react';
import classNames from 'classnames';

import type { RadioGroupItemProps, RadioGroupProps } from './Spec';

import './Styles.scss';

const CLASS_NAME = 'kicl--components--radio-group';

type ContextValue = {
  disabled?: boolean;
  name: string;
  onValueChange: (value: string) => void;
  value?: string;
};

const RadioGroupContext = createContext<ContextValue | null>(null);

const useRadioGroup = () => {
  const ctx = useContext(RadioGroupContext);
  if (!ctx) {
    throw new Error('RadioGroupItem must be used within RadioGroup');
  }
  return ctx;
};

/**
 * Mutually exclusive options — API aligned with
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

const RadioGroupItem = React.forwardRef<HTMLButtonElement, RadioGroupItemProps>(
  ({ className, disabled, value, ...rest }, ref) => {
    const group = useRadioGroup();
    const isDisabled = disabled || group.disabled;
    const checked = group.value === value;

    return (
      <button
        ref={ref}
        type='button'
        role='radio'
        aria-checked={checked}
        data-slot='radio-group-item'
        disabled={isDisabled}
        className={classNames(
          `${CLASS_NAME}__item`,
          {
            [`${CLASS_NAME}__item--checked`]: checked,
            [`${CLASS_NAME}__item--disabled`]: isDisabled,
          },
          className
        )}
        onClick={() => group.onValueChange(value)}
        {...rest}
      />
    );
  }
);

RadioGroupItem.displayName = 'RadioGroupItem';

export type { RadioGroupProps, RadioGroupItemProps } from './Spec';
export { RadioGroupItem };
export default RadioGroup;

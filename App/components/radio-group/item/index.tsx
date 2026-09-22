import React from 'react';

// Libraries
import classNames from 'classnames';

// Spec
import type { RadioGroupItemProps } from '@/components/radio-group/spec';

// Styles
import './styles.scss';

// Constants
import { CLASS_NAME as RADIO_GROUP } from '@/components/radio-group/constants';

// Context
import { useRadioGroup } from '@/components/radio-group/context';

const CLASS_NAME = `${RADIO_GROUP}__item`;

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
          CLASS_NAME,
          {
            [`${CLASS_NAME}--checked`]: checked,
            [`${CLASS_NAME}--disabled`]: isDisabled,
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

export { RadioGroupItem };

import React, { useEffect } from 'react';

// Libraries
import classNames from 'classnames';

// Components
import { Ri } from '@/icons';

// Styles
import './styles.scss';

// Constants
import { CLASS_NAME as SELECT } from '@/components/select/constants';

// Context
import { useSelect } from '@/components/select/context';

import type { SelectItemProps } from '@/components/select/spec';

const CLASS_NAME = `${SELECT}__item`;

const SelectItem = React.forwardRef<HTMLButtonElement, SelectItemProps>(
  ({ children, className, disabled, value, ...rest }, ref) => {
    const { registerItem, onValueChange, value: selectedValue } = useSelect();
    const label = typeof children === 'string' ? children : String(value);
    const selected = selectedValue === value;

    useEffect(() => {
      registerItem({ value, label });
    }, [label, registerItem, value]);

    return (
      <button
        ref={ref}
        type='button'
        role='option'
        aria-selected={selected}
        disabled={disabled}
        data-slot='select-item'
        className={classNames(CLASS_NAME, 'kicl-font-size-small', className)}
        onClick={() => onValueChange(value, label)}
        {...rest}
      >
        <span>{children}</span>
        {selected ? (
          <Ri.RiCheckLine className={`${CLASS_NAME}-indicator`} aria-hidden />
        ) : null}
      </button>
    );
  }
);

SelectItem.displayName = 'SelectItem';

export { SelectItem };

import React from 'react';

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

import type { SelectTriggerProps } from '@/components/select/spec';

const CLASS_NAME = `${SELECT}__trigger`;

const SelectTrigger = React.forwardRef<HTMLButtonElement, SelectTriggerProps>(
  ({ children, className, disabled, onKeyDown, ...rest }, ref) => {
    const select = useSelect();
    const isDisabled = disabled || select.disabled;

    return (
      <button
        ref={ref}
        type='button'
        id={select.triggerId}
        disabled={isDisabled}
        aria-haspopup='listbox'
        aria-expanded={select.open}
        aria-controls={select.listId}
        data-slot='select-trigger'
        className={classNames(CLASS_NAME, 'kicl-font-size-small', className)}
        onClick={() => {
          if (!isDisabled) {
            select.setOpen(!select.open);
          }
        }}
        onKeyDown={(event) => {
          onKeyDown?.(event);
          if (event.defaultPrevented) {
            return;
          }
          if (
            event.key === 'ArrowDown' ||
            event.key === 'Enter' ||
            event.key === ' '
          ) {
            event.preventDefault();
            select.setOpen(true);
          }
          if (event.key === 'Escape') {
            select.setOpen(false);
          }
        }}
        {...rest}
      >
        {children}
        <Ri.RiArrowDownSLine className={`${SELECT}__icon`} aria-hidden />
      </button>
    );
  }
);

SelectTrigger.displayName = 'SelectTrigger';

export { SelectTrigger };

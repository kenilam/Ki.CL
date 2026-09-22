import React from 'react';

// Libraries
import classNames from 'classnames';

// Spec
import type { PopoverTriggerProps } from '@/components/popover/spec';

// Styles
import './styles.scss';

// Constants
import { CLASS_NAME as POPOVER } from '@/components/popover/constants';

// Context
import { usePopover } from '@/components/popover/context';

const CLASS_NAME = `${POPOVER}__trigger`;

const PopoverTrigger = React.forwardRef<HTMLButtonElement, PopoverTriggerProps>(
  ({ children, className, onClick, ...rest }, ref) => {
    const popover = usePopover();

    return (
      <button
        ref={ref}
        type='button'
        data-slot='popover-trigger'
        aria-expanded={popover.open}
        aria-haspopup='dialog'
        id={`${popover.id}__trigger`}
        className={classNames(CLASS_NAME, className)}
        /*
         * The browser toggles the panel from this attribute. The handler is
         * passed through untouched and no longer sets state - whatever
         * happens, the `toggle` event on the panel is what reports it back.
         */
        popoverTarget={popover.id}
        onClick={onClick}
        {...rest}
      >
        {children}
      </button>
    );
  }
);

PopoverTrigger.displayName = 'PopoverTrigger';

export { PopoverTrigger };

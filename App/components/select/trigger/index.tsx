import React from 'react';

// Libraries
import classNames from 'classnames';

// Components
import { Ri } from '@/icons';

// Styles
import './styles.scss';

// Constants
import { CLASS_NAME as SELECT } from '@/components/select/constants';

import type { SelectTriggerProps } from '@/components/select/spec';

const CLASS_NAME = `${SELECT}__trigger`;

/**
 * The `<button>` a base-select draws as its face. The `<select>` owns focus,
 * opening and keys; browsers without base-select ignore this element.
 */
const SelectTrigger = React.forwardRef<HTMLButtonElement, SelectTriggerProps>(
  ({ children, className, ...rest }, ref) => (
    <button
      ref={ref}
      data-slot='select-trigger'
      className={classNames(CLASS_NAME, className)}
      {...rest}
    >
      {children}
      <Ri.RiArrowDownSLine className={`${SELECT}__icon`} aria-hidden />
    </button>
  )
);

SelectTrigger.displayName = 'SelectTrigger';

export { SelectTrigger };

import React from 'react';

// Libraries
import classNames from 'classnames';

// Styles
import './styles.scss';

// Constants
import { CLASS_NAME as SELECT } from '@/components/select/constants';

// Context
import { useSelect } from '@/components/select/context';

import type { SelectValueProps } from '@/components/select/spec';

const CLASS_NAME = `${SELECT}__value`;

const SelectValue = React.forwardRef<HTMLSpanElement, SelectValueProps>(
  ({ className, placeholder = 'Select…', ...rest }, ref) => {
    const select = useSelect();
    const empty = !select.valueLabel;

    return (
      <span
        ref={ref}
        data-slot='select-value'
        className={classNames(
          CLASS_NAME,
          { [`${CLASS_NAME}--placeholder`]: empty },
          className
        )}
        {...rest}
      >
        {empty ? placeholder : select.valueLabel}
      </span>
    );
  }
);

SelectValue.displayName = 'SelectValue';

export { SelectValue };

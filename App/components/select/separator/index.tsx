import React from 'react';

// Libraries
import classNames from 'classnames';

// Styles
import './styles.scss';

// Constants
import { CLASS_NAME as SELECT } from '@/components/select/constants';

import type { SelectSeparatorProps } from '@/components/select/spec';

const CLASS_NAME = `${SELECT}__separator`;

const SelectSeparator = React.forwardRef<HTMLHRElement, SelectSeparatorProps>(
  ({ className, ...rest }, ref) => (
    <hr
      ref={ref}
      data-slot='select-separator'
      className={classNames(CLASS_NAME, className)}
      {...rest}
    />
  )
);

SelectSeparator.displayName = 'SelectSeparator';

export { SelectSeparator };

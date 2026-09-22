import React from 'react';

// Libraries
import classNames from 'classnames';

// Styles
import './styles.scss';

// Constants
import { CLASS_NAME as SELECT } from '@/components/select/constants';

import type { SelectGroupProps } from '@/components/select/spec';

const CLASS_NAME = `${SELECT}__group`;

const SelectGroup = React.forwardRef<HTMLDivElement, SelectGroupProps>(
  ({ className, ...rest }, ref) => (
    <div
      ref={ref}
      role='group'
      data-slot='select-group'
      className={classNames(CLASS_NAME, className)}
      {...rest}
    />
  )
);

SelectGroup.displayName = 'SelectGroup';

export { SelectGroup };

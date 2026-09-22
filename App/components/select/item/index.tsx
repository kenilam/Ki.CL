import React from 'react';

// Libraries
import classNames from 'classnames';

// Styles
import './styles.scss';

// Constants
import { CLASS_NAME as SELECT } from '@/components/select/constants';

import type { SelectItemProps } from '@/components/select/spec';

const CLASS_NAME = `${SELECT}__item`;

const SelectItem = React.forwardRef<HTMLOptionElement, SelectItemProps>(
  ({ className, ...rest }, ref) => (
    <option
      ref={ref}
      data-slot='select-item'
      className={classNames(CLASS_NAME, className)}
      {...rest}
    />
  )
);

SelectItem.displayName = 'SelectItem';

export { SelectItem };

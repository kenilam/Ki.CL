import React from 'react';

// Libraries
import classNames from 'classnames';

// Styles
import './styles.scss';

// Constants
import { CLASS_NAME as SELECT } from '@/components/select/constants';

import type { SelectLabelProps } from '@/components/select/spec';

const CLASS_NAME = `${SELECT}__label`;

const SelectLabel = React.forwardRef<HTMLDivElement, SelectLabelProps>(
  ({ className, ...rest }, ref) => (
    <div
      ref={ref}
      data-slot='select-label'
      className={classNames(CLASS_NAME, 'kicl-font-size-smaller', className)}
      {...rest}
    />
  )
);

SelectLabel.displayName = 'SelectLabel';

export { SelectLabel };

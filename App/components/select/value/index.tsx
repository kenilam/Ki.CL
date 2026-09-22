import React from 'react';

// Libraries
import classNames from 'classnames';

// Styles
import './styles.scss';

// Constants
import { CLASS_NAME as SELECT } from '@/components/select/constants';

import type { SelectValueProps } from '@/components/select/spec';

const CLASS_NAME = `${SELECT}__value`;

/**
 * `<selectedcontent>` copies the chosen option into the trigger. The
 * placeholder is an option too, so it goes on Select.
 */
const SelectValue: React.FunctionComponent<SelectValueProps> = ({
  className,
  ...rest
}) =>
  React.createElement('selectedcontent', {
    'data-slot': 'select-value',
    className: classNames(CLASS_NAME, className),
    ...rest,
  });

SelectValue.displayName = 'SelectValue';

export { SelectValue };

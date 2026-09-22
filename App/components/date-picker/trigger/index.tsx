import React from 'react';

// Libraries
import classNames from 'classnames';

// Components
import { PopoverTrigger } from '@/components/popover';
import { Ri } from '@/icons';

// Spec
import type { DatePickerTriggerProps } from '@/components/date-picker/spec';

// Styles
import '@/components/input/styles.scss';
import './styles.scss';

// Constants
import { CLASS_NAME as DATE_PICKER } from '@/components/date-picker/constants';

// Context
import { useDatePicker } from '@/components/date-picker/context';

const Trigger: React.FunctionComponent<DatePickerTriggerProps> = (props) => {
  const { disabled, label, placeholder } = useDatePicker();

  return (
    <PopoverTrigger
      {...props}
      disabled={disabled}
      className={classNames(
        'kicl--components--input',
        `${DATE_PICKER}__trigger`,
        'kicl-font-size-small'
      )}
    >
      <Ri.RiCalendarLine className={`${DATE_PICKER}__icon`} aria-hidden />
      <span className={label ? undefined : 'kicl-color-grey'}>
        {label ?? placeholder}
      </span>
    </PopoverTrigger>
  );
};

export { Trigger };

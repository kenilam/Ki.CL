import React, { useState } from 'react';
import classNames from 'classnames';

import { Ri } from '@/Icons';

import Calendar, { type DateRange } from '@/Components/Calendar';
import Popover, { PopoverContent, PopoverTrigger } from '@/Components/Popover';

import type { DatePickerProps } from './Spec';

import '../Input/Styles.scss';
import './Styles.scss';

const CLASS_NAME = 'kicl--components--date-picker';

const defaultFormatDate = (date: Date) =>
  date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

const formatRange = (
  range: DateRange | undefined,
  formatDate: (date: Date) => string
) => {
  if (!range?.from) {
    return null;
  }
  if (!range.to || range.from.getTime() === range.to.getTime()) {
    return formatDate(range.from);
  }
  return `${formatDate(range.from)} - ${formatDate(range.to)}`;
};

/**
 * Date picker composed from Popover + Calendar - aligned with
 * https://ui.shadcn.com/docs/components/base/date-picker
 */
const DatePicker: React.FC<DatePickerProps> = (props) => {
  const {
    className,
    disabled,
    formatDate = defaultFormatDate,
    mode = 'single',
    placeholder = mode === 'range' ? 'Pick a date range' : 'Pick a date',
  } = props;

  const isControlled = props.value !== undefined;
  const [open, setOpen] = useState(false);

  const [uncontrolledSingle, setUncontrolledSingle] = useState(
    mode === 'single'
      ? (props as Extract<DatePickerProps, { mode?: 'single' }>).defaultValue
      : undefined
  );
  const [uncontrolledRange, setUncontrolledRange] = useState(
    mode === 'range'
      ? (props as Extract<DatePickerProps, { mode: 'range' }>).defaultValue
      : undefined
  );

  const selectedSingle =
    mode === 'single'
      ? isControlled
        ? (props as Extract<DatePickerProps, { mode?: 'single' }>).value
        : uncontrolledSingle
      : undefined;

  const selectedRange =
    mode === 'range'
      ? isControlled
        ? (props as Extract<DatePickerProps, { mode: 'range' }>).value
        : uncontrolledRange
      : undefined;

  const label =
    mode === 'range'
      ? formatRange(selectedRange, formatDate)
      : selectedSingle
        ? formatDate(selectedSingle)
        : null;

  return (
    <Popover open={open} onOpenChange={setOpen} className={className}>
      <PopoverTrigger
        disabled={disabled}
        className={classNames(
          'kicl--components--input',
          `${CLASS_NAME}__trigger`,
          'kicl-font-size-small'
        )}
      >
        <Ri.RiCalendarLine className={`${CLASS_NAME}__icon`} aria-hidden />
        <span className={label ? undefined : 'kicl-color-grey'}>
          {label ?? placeholder}
        </span>
      </PopoverTrigger>
      <PopoverContent>
        {mode === 'range' ? (
          <Calendar
            mode='range'
            selected={selectedRange}
            onSelect={(range) => {
              const rangeProps = props as Extract<
                DatePickerProps,
                { mode: 'range' }
              >;
              if (!isControlled) {
                setUncontrolledRange(range);
              }
              rangeProps.onValueChange?.(range);
              if (range?.from && range.to) {
                setOpen(false);
              }
            }}
          />
        ) : (
          <Calendar
            mode='single'
            selected={selectedSingle}
            onSelect={(date) => {
              const singleProps = props as Extract<
                DatePickerProps,
                { mode?: 'single' }
              >;
              if (!isControlled) {
                setUncontrolledSingle(date);
              }
              singleProps.onValueChange?.(date);
              setOpen(false);
            }}
          />
        )}
      </PopoverContent>
    </Popover>
  );
};

DatePicker.displayName = 'DatePicker';

export type {
  DatePickerProps,
  DatePickerMode,
  DatePickerRangeProps,
  DatePickerSingleProps,
} from './Spec';
export type { DateRange } from '@/Components/Calendar';
export default DatePicker;

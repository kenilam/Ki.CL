import React, { useState } from 'react';

// Components
import { Popover, PopoverContent } from '@/components/popover';

// Context
import { DatePickerContext, type DatePickerContextValue } from './context';

// Helpers
import { defaultFormatDate, formatRange } from './helpers';

// Partials
import { Calendar } from './calendar';
import { Trigger } from './trigger';

import type { DatePickerProps } from './spec';

type SingleProps = Extract<DatePickerProps, { mode?: 'single' }>;
type RangeProps = Extract<DatePickerProps, { mode: 'range' }>;

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
    mode === 'single' ? (props as SingleProps).defaultValue : undefined
  );
  const [uncontrolledRange, setUncontrolledRange] = useState(
    mode === 'range' ? (props as RangeProps).defaultValue : undefined
  );

  const selectedSingle =
    mode === 'single'
      ? isControlled
        ? (props as SingleProps).value
        : uncontrolledSingle
      : undefined;

  const selectedRange =
    mode === 'range'
      ? isControlled
        ? (props as RangeProps).value
        : uncontrolledRange
      : undefined;

  const label =
    mode === 'range'
      ? formatRange(selectedRange, formatDate)
      : selectedSingle
        ? formatDate(selectedSingle)
        : null;

  const context: DatePickerContextValue = {
    disabled,
    label,
    mode,
    onSelectRange: (range) => {
      if (!isControlled) {
        setUncontrolledRange(range);
      }
      (props as RangeProps).onValueChange?.(range);
      if (range?.from && range.to) {
        setOpen(false);
      }
    },
    onSelectSingle: (date) => {
      if (!isControlled) {
        setUncontrolledSingle(date);
      }
      (props as SingleProps).onValueChange?.(date);
      setOpen(false);
    },
    placeholder,
    selectedRange,
    selectedSingle,
  };

  return (
    <DatePickerContext.Provider value={context}>
      <Popover open={open} onOpenChange={setOpen} className={className}>
        <Trigger />
        <PopoverContent>
          <Calendar />
        </PopoverContent>
      </Popover>
    </DatePickerContext.Provider>
  );
};

DatePicker.displayName = 'DatePicker';

export type {
  DatePickerProps,
  DatePickerMode,
  DatePickerRangeProps,
  DatePickerSingleProps,
} from './spec';
export type { DateRange } from '@/components/calendar';
export { DatePicker };

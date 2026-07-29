import React, { useMemo, useState } from 'react';
import classNames from 'classnames';

import { Ri } from '@/Icons';

import type { CalendarProps, DateRange } from './Spec';

import './Styles.scss';

const CLASS_NAME = 'kicl--components--calendar';

const WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

const startOfDay = (date: Date) => {
  const next = new Date(date);
  next.setHours(0, 0, 0, 0);
  return next;
};

const sameDay = (a?: Date, b?: Date) => {
  if (!a || !b) {
    return false;
  }
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
};

const isBefore = (a: Date, b: Date) => a.getTime() < b.getTime();

const isInRange = (date: Date, range?: DateRange) => {
  if (!range?.from || !range.to) {
    return false;
  }
  const time = date.getTime();
  const from = startOfDay(range.from).getTime();
  const to = startOfDay(range.to).getTime();
  return time > from && time < to;
};

const monthLabel = (date: Date) =>
  date.toLocaleString(undefined, {
    month: 'long',
    year: 'numeric',
  });

const seedMonth = (props: CalendarProps) => {
  if (props.defaultMonth) {
    return props.defaultMonth;
  }
  if (props.mode === 'range') {
    return props.selected?.from ?? props.selected?.to ?? new Date();
  }
  return props.selected ?? new Date();
};

/**
 * Month grid — used by DatePicker (shadcn composition).
 * https://ui.shadcn.com/docs/components/base/date-picker
 */
const Calendar = React.forwardRef<HTMLDivElement, CalendarProps>(
  (props, ref) => {
    const mode = props.mode ?? 'single';
    const { className, disabled } = props;

    const today = useMemo(() => startOfDay(new Date()), []);
    const [month, setMonth] = useState(() => {
      const seed = seedMonth(props);
      return new Date(seed.getFullYear(), seed.getMonth(), 1);
    });

    const days = useMemo(() => {
      const first = new Date(month.getFullYear(), month.getMonth(), 1);
      const startOffset = first.getDay();
      const gridStart = new Date(first);
      gridStart.setDate(first.getDate() - startOffset);

      return Array.from({ length: 42 }, (_, index) => {
        const date = new Date(gridStart);
        date.setDate(gridStart.getDate() + index);
        return startOfDay(date);
      });
    }, [month]);

    const onDayClick = (date: Date) => {
      if (props.mode === 'range') {
        const current = props.selected;
        let next: DateRange;

        if (!current?.from || (current.from && current.to)) {
          next = { from: date, to: undefined };
        } else if (sameDay(current.from, date)) {
          next = { from: date, to: date };
        } else if (isBefore(date, current.from)) {
          next = { from: date, to: current.from };
        } else {
          next = { from: current.from, to: date };
        }

        props.onSelect?.(next);
        return;
      }

      props.onSelect?.(date);
    };

    const selectedSingle = props.mode === 'range' ? undefined : props.selected;
    const selectedRange = props.mode === 'range' ? props.selected : undefined;

    return (
      <div
        ref={ref}
        data-slot='calendar'
        data-mode={mode}
        className={classNames(CLASS_NAME, className)}
      >
        <div className={`${CLASS_NAME}__header`}>
          <button
            type='button'
            className={`${CLASS_NAME}__nav`}
            aria-label='Previous month'
            onClick={() =>
              setMonth(new Date(month.getFullYear(), month.getMonth() - 1, 1))
            }
          >
            <Ri.RiArrowLeftSLine aria-hidden />
          </button>
          <div
            className={`${CLASS_NAME}__title kicl-font-size-small kicl-font-weight-bold`}
          >
            {monthLabel(month)}
          </div>
          <button
            type='button'
            className={`${CLASS_NAME}__nav`}
            aria-label='Next month'
            onClick={() =>
              setMonth(new Date(month.getFullYear(), month.getMonth() + 1, 1))
            }
          >
            <Ri.RiArrowRightSLine aria-hidden />
          </button>
        </div>

        <div className={`${CLASS_NAME}__weekdays`} aria-hidden>
          {WEEKDAYS.map((day) => (
            <div
              key={day}
              className={`${CLASS_NAME}__weekday kicl-font-size-smallest`}
            >
              {day}
            </div>
          ))}
        </div>

        <div className={`${CLASS_NAME}__grid`} role='grid'>
          {days.map((date) => {
            const outside = date.getMonth() !== month.getMonth();
            const isToday = sameDay(date, today);
            const isDisabled = disabled?.(date) ?? false;

            const isRangeStart = sameDay(date, selectedRange?.from);
            const isRangeEnd = sameDay(date, selectedRange?.to);
            const isRangeMiddle = isInRange(date, selectedRange);
            const isSelected =
              mode === 'single'
                ? sameDay(date, selectedSingle)
                : isRangeStart || isRangeEnd;

            return (
              <button
                key={date.toISOString()}
                type='button'
                role='gridcell'
                aria-selected={isSelected || isRangeMiddle}
                disabled={isDisabled}
                className={classNames(
                  `${CLASS_NAME}__day`,
                  'kicl-font-size-small',
                  'kicl-position-relative',
                  {
                    [`${CLASS_NAME}__day--outside`]: outside,
                    [`${CLASS_NAME}__day--selected`]: isSelected,
                    [`${CLASS_NAME}__day--range-start`]: isRangeStart,
                    [`${CLASS_NAME}__day--range-end`]: isRangeEnd,
                    [`${CLASS_NAME}__day--range-middle`]: isRangeMiddle,
                    [`${CLASS_NAME}__day--today`]: isToday,
                  }
                )}
                onClick={() => onDayClick(date)}
              >
                {date.getDate()}
              </button>
            );
          })}
        </div>
      </div>
    );
  }
);

Calendar.displayName = 'Calendar';

export type {
  CalendarMode,
  CalendarProps,
  CalendarRangeProps,
  CalendarSingleProps,
  DateRange,
} from './Spec';
export default Calendar;

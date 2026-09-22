import React from 'react';

// Libraries
import classNames from 'classnames';

// Styles
import './styles.scss';

// Constants
import { CLASS_NAME as CALENDAR } from '@/components/calendar/constants';

// Context
import { useCalendar } from '@/components/calendar/context';

// Helpers
import { dayLabel, isInRange, sameDay } from '@/components/calendar/helpers';

const CLASS_NAME = `${CALENDAR}__day`;

type Props = { date: Date };

/**
 * One day of the month table. The label is the full date, since the cell's
 * text alone ("15") says nothing out of context.
 */
const Day: React.FunctionComponent<Props> = ({ date }) => {
  const {
    disabled,
    mode,
    month,
    onDayClick,
    selectedRange,
    selectedSingle,
    today,
  } = useCalendar();

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
      type='button'
      aria-label={dayLabel(date)}
      aria-current={isToday ? 'date' : undefined}
      aria-pressed={isSelected || isRangeMiddle}
      disabled={isDisabled}
      className={classNames(CLASS_NAME, 'kicl-font-size-small', {
        [`${CLASS_NAME}--outside`]: outside,
        [`${CLASS_NAME}--selected`]: isSelected,
        [`${CLASS_NAME}--range-start`]: isRangeStart,
        [`${CLASS_NAME}--range-end`]: isRangeEnd,
        [`${CLASS_NAME}--range-middle`]: isRangeMiddle,
      })}
      onClick={() => onDayClick(date)}
    >
      {date.getDate()}
    </button>
  );
};

export { Day };

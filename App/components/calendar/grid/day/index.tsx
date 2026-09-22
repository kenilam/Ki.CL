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
import { isInRange, sameDay } from '@/components/calendar/helpers';

const CLASS_NAME = `${CALENDAR}__day`;

type Props = { date: Date };

/** One cell of the month grid. The date is the only prop, since the grid renders one per day. */
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
      role='gridcell'
      aria-selected={isSelected || isRangeMiddle}
      disabled={isDisabled}
      className={classNames(
        CLASS_NAME,
        'kicl-font-size-small',
        'kicl-position-relative',
        {
          [`${CLASS_NAME}--outside`]: outside,
          [`${CLASS_NAME}--selected`]: isSelected,
          [`${CLASS_NAME}--range-start`]: isRangeStart,
          [`${CLASS_NAME}--range-end`]: isRangeEnd,
          [`${CLASS_NAME}--range-middle`]: isRangeMiddle,
          [`${CLASS_NAME}--today`]: isToday,
        }
      )}
      onClick={() => onDayClick(date)}
    >
      {date.getDate()}
    </button>
  );
};

export { Day };

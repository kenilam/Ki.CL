import React from 'react';

// Components
import { Ri } from '@/icons';

// Styles
import './styles.scss';

// Constants
import { CLASS_NAME as CALENDAR } from '@/components/calendar/constants';

// Context
import { useCalendar } from '@/components/calendar/context';

// Helpers
import { monthLabel } from '@/components/calendar/helpers';

const COPY = {
  next: 'Next month',
  previous: 'Previous month',
};

const Header: React.FunctionComponent = () => {
  const { month, setMonth } = useCalendar();

  return (
    <div className={`${CALENDAR}__header`}>
      <button
        type='button'
        className={`${CALENDAR}__nav`}
        aria-label={COPY.previous}
        onClick={() =>
          setMonth(new Date(month.getFullYear(), month.getMonth() - 1, 1))
        }
      >
        <Ri.RiArrowLeftSLine aria-hidden />
      </button>
      <div
        className={`${CALENDAR}__title kicl-font-size-small kicl-font-weight-bold`}
      >
        {monthLabel(month)}
      </div>
      <button
        type='button'
        className={`${CALENDAR}__nav`}
        aria-label={COPY.next}
        onClick={() =>
          setMonth(new Date(month.getFullYear(), month.getMonth() + 1, 1))
        }
      >
        <Ri.RiArrowRightSLine aria-hidden />
      </button>
    </div>
  );
};

export { Header };

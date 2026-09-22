import React, { useMemo } from 'react';

// Constants
import { CLASS_NAME as CALENDAR } from '@/components/calendar/constants';

// Context
import { useCalendar } from '@/components/calendar/context';

// Helpers
import { startOfDay } from '@/components/calendar/helpers';

// Partials
import { Day } from './day';

const Grid: React.FunctionComponent = () => {
  const { month } = useCalendar();

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

  return (
    <div className={`${CALENDAR}__grid`} role='grid'>
      {days.map((date) => (
        <Day key={date.toISOString()} date={date} />
      ))}
    </div>
  );
};

export { Grid };

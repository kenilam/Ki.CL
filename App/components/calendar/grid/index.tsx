import React, { useMemo } from 'react';

// Context
import { useCalendar } from '@/components/calendar/context';

// Helpers
import { startOfDay } from '@/components/calendar/helpers';

// Partials
import { Day } from './day';

/** Six weeks of seven days, starting on the Sunday before the 1st. */
const Grid: React.FunctionComponent = () => {
  const { month } = useCalendar();

  const weeks = useMemo(() => {
    const first = new Date(month.getFullYear(), month.getMonth(), 1);
    const gridStart = new Date(first);
    gridStart.setDate(first.getDate() - first.getDay());

    return Array.from({ length: 6 }, (_, week) =>
      Array.from({ length: 7 }, (_, day) => {
        const date = new Date(gridStart);
        date.setDate(gridStart.getDate() + week * 7 + day);
        return startOfDay(date);
      })
    );
  }, [month]);

  return (
    <tbody>
      {weeks.map((days) => (
        <tr key={days[0].toISOString()}>
          {days.map((date) => (
            <td key={date.toISOString()}>
              <Day date={date} />
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

export { Grid };

import React from 'react';

// Styles
import './styles.scss';

// Constants
import { CLASS_NAME as CALENDAR } from '@/components/calendar/constants';

const WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

const Weekdays: React.FunctionComponent = () => (
  <div className={`${CALENDAR}__weekdays`} aria-hidden>
    {WEEKDAYS.map((day) => (
      <div key={day} className={`${CALENDAR}__weekday kicl-font-size-small`}>
        {day}
      </div>
    ))}
  </div>
);

export { Weekdays };

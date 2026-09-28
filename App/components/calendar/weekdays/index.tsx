import React from 'react';

// Libraries
import classNames from 'classnames';

// Styles
import './styles.scss';

// Constants
import { CLASS_NAME as CALENDAR } from '@/components/calendar/constants';

// Helpers
import { weekdays } from '@/components/calendar/helpers';

/** Column headers; `abbr` gives each column its full day name. */
const Weekdays: React.FunctionComponent = () => (
  <thead>
    <tr>
      {weekdays().map(({ long, short }) => (
        <th
          key={long}
          scope='col'
          abbr={long}
          className={classNames(
            `${CALENDAR}__weekday`,
            'kicl-font-size-small',
            'kicl-text-align-center'
          )}
        >
          {short}
        </th>
      ))}
    </tr>
  </thead>
);

export { Weekdays };

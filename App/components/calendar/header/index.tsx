import React from 'react';

// Libraries
import classNames from 'classnames';

// Components
import { Layout } from '@/components/layout';
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
  const { month, setMonth, titleId } = useCalendar();

  return (
    <Layout
      autoFlow='column'
      frames='max-content--auto--max-content'
      alignItems='center'
      gap='narrower'
    >
      <div className={`${CALENDAR}__header`}>
        <button
          type='button'
          className={classNames(
            `${CALENDAR}__nav`,
            'kicl-border-radius-sm',
            'kicl-display-inline-flex',
            'kicl-padding-block-narrowest',
            'kicl-padding-inline-narrowest'
          )}
          aria-label={COPY.previous}
          onClick={() =>
            setMonth(new Date(month.getFullYear(), month.getMonth() - 1, 1))
          }
        >
          <Ri.RiArrowLeftSLine aria-hidden />
        </button>
        <div
          id={titleId}
          aria-live='polite'
          className={classNames(
            `${CALENDAR}__title`,
            'kicl-font-size-small',
            'kicl-font-weight-bold',
            'kicl-text-align-center'
          )}
        >
          {monthLabel(month)}
        </div>
        <button
          type='button'
          className={classNames(
            `${CALENDAR}__nav`,
            'kicl-border-radius-sm',
            'kicl-display-inline-flex',
            'kicl-padding-block-narrowest',
            'kicl-padding-inline-narrowest'
          )}
          aria-label={COPY.next}
          onClick={() =>
            setMonth(new Date(month.getFullYear(), month.getMonth() + 1, 1))
          }
        >
          <Ri.RiArrowRightSLine aria-hidden />
        </button>
      </div>
    </Layout>
  );
};

export { Header };

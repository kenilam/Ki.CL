import React, { PropsWithChildren } from 'react';

// Libraries
import classNames from 'classnames';
import DatePicker, { CalendarContainer } from 'react-datepicker';

// Icons
import * as Icons from '@/Icons';

// Context
import SchedularProvider, { useSchedularContext } from './Context';

// Components
import { Animation, Layout } from '@/Components';

// Partials
import Day from './Day';
import Header from './Header';
import Month from './Month';

// Spec
import * as Spec from './Spec';

// Styles
import './Styles.scss';

type Props = Spec.Props;

const CLASS_NAME = 'kicl--widgets--schedular';

const OFFSET = 3; // Days

const maxDate = new Date();
const minDate = new Date();

maxDate.setMonth(maxDate.getMonth() + 6);
minDate.setDate(minDate.getDate() + OFFSET);

const DEFAULT = {
  maxDate,
  minDate,
};

const Contents: React.FunctionComponent<
  PropsWithChildren<Pick<Props, 'className'>>
> = ({ children, className: _className }) => {
  const SchedularContext = useSchedularContext();

  const {
    date,
    fixedHeight = true,
    footer,
    inline = true,
    maxDate = DEFAULT.maxDate,
    minDate = DEFAULT.minDate,
    selectsRange = true,
    ...rest
  } = SchedularContext;

  const className = classNames(CLASS_NAME, _className);

  const Container: React.FunctionComponent<PropsWithChildren> = ({
    children,
  }) => {
    return (
      <Layout autoFlow='row' gap='wide'>
        <CalendarContainer className={className}>
          {children}
          <Animation in={!!footer}>{footer}</Animation>
        </CalendarContainer>
      </Layout>
    );
  };

  const renderDayContents = Day(SchedularContext);

  return (
    <DatePicker
      {...rest}
      selected={date}
      calendarContainer={Container}
      fixedHeight={fixedHeight}
      inline={inline}
      maxDate={maxDate}
      minDate={minDate}
      nextMonthButtonLabel={<Icons.Ri.RiArrowRightSLine />}
      previousMonthButtonLabel={<Icons.Ri.RiArrowLeftSLine />}
      renderCustomHeader={Header}
      renderDayContents={renderDayContents}
      renderMonthContent={Month}
      selectsRange={selectsRange}
      swapRange
    >
      {children}
    </DatePicker>
  );
};

const Scheduler: React.FunctionComponent<Props> = ({
  children,
  className,
  ...props
}) => {
  return (
    <SchedularProvider {...props}>
      <Contents className={className}>{children}</Contents>
    </SchedularProvider>
  );
};

export { type Props };
export default Scheduler;

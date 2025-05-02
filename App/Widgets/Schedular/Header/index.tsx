import React from 'react';

// Icons
import * as Icons from '@/Icons';

// Components
import { Button, Heading, Layout } from '@/Components';
import { ReactDatePickerCustomHeaderProps } from 'react-datepicker/dist/calendar';

// Styles
import './Styles.scss';

const CLASS_NAME = 'kicl--widgets--schedular--header';

const Months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const now = new Date();

const currentMonth = now.getMonth();

const currentYear = now.getFullYear();

const Header = ({
  date,
  decreaseMonth,
  increaseMonth,
  changeMonth,
  changeYear,
  nextMonthButtonDisabled,
  prevMonthButtonDisabled,
}: ReactDatePickerCustomHeaderProps) => {
  const previous = () => {
    decreaseMonth();
  };

  const next = () => {
    increaseMonth();
  };

  const current = () => {
    changeMonth(currentMonth);
    changeYear(currentYear);
  };

  const Month = date.getMonth();
  const Year = date.getFullYear();

  return (
    <Layout
      alignItems='center'
      autoFlow='column'
      frames='max-content--auto--max-content'
      gap='narrow'
    >
      <header className={CLASS_NAME}>
        <Button
          disabled={prevMonthButtonDisabled}
          unstyled
          title='Previous Month'
          onClick={previous}
        >
          <Icons.Ri.RiArrowLeftSLine />
        </Button>
        <Layout
          alignContent='center'
          alignItems='center'
          autoFlow='column'
          gap='narrow'
          justifyContent='center'
          justifyItems='center'
        >
          <Heading
            aria-live='polite'
            className='kicl-text-align-center'
            dense
            is='h4'
            role='alert'
          >
            {`${Months[Month]}/${Year}`}
            <Button
              disabled={currentMonth === Month}
              onClick={current}
              unstyled
              title='Back to Current Month'
            >
              <Icons.Ri.RiCalendarEventLine />
            </Button>
          </Heading>
        </Layout>
        <Button
          disabled={nextMonthButtonDisabled}
          unstyled
          title='Next Month'
          onClick={next}
        >
          <Icons.Ri.RiArrowRightSLine />
        </Button>
      </header>
    </Layout>
  );
};

export default Header;

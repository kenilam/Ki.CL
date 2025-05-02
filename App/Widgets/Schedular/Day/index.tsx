import React from 'react';

// Icons
import * as Icons from '@/Icons';

// Components
import { Button, ButtonProps } from '@/Components';

// Context
import { useSchedularContext } from '@/Widgets/Schedular/Context';

const CLASS_NAME = 'kicl--widgets--schedular--day';

const Numbers = [
  Icons.Ri.RiNumber0,
  Icons.Ri.RiNumber1,
  Icons.Ri.RiNumber2,
  Icons.Ri.RiNumber3,
  Icons.Ri.RiNumber4,
  Icons.Ri.RiNumber5,
  Icons.Ri.RiNumber6,
  Icons.Ri.RiNumber7,
  Icons.Ri.RiNumber8,
  Icons.Ri.RiNumber9,
];

const OFFSET = 3; // Days

const current = new Date();

const nowDay = new Date(
  `${current.getFullYear()}/${current.getMonth()}/${current.getDate()} 00:00:00`
);

current.setDate(current.getDate() + OFFSET);

const availableDay = new Date(
  `${current.getFullYear()}/${current.getMonth()}/${current.getDate()} 00:00:00`
);

const Day = (SchedularContext: ReturnType<typeof useSchedularContext>) => {
  return (day: number, date: Date) => {
    const padded = String(day).padStart(2, '0');

    const thisDay = new Date(
      `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()} 00:00:00`
    );
    const selectedDay = new Date(
      `${SchedularContext.date?.getFullYear()}/${(SchedularContext.date?.getMonth() || -1) + 1}/${SchedularContext.date?.getDate()} 00:00:00`
    );

    const isSelectedDay = thisDay.toDateString() === selectedDay.toDateString();
    const isNowDay = thisDay.toDateString() === nowDay.toDateString();

    const level: ButtonProps['level'] =
      isNowDay || isSelectedDay ? 'confirm' : undefined;

    const variant: ButtonProps['variant'] = isSelectedDay
      ? 'primary'
      : 'secondary';

    const enabled = date >= availableDay;

    return (
      <Button
        className={CLASS_NAME}
        disabled={!enabled}
        gap='none'
        level={level}
        size='small'
        variant={variant}
      >
        {String(padded)
          .split('')
          .map((number, index) => {
            const Icon = Numbers[Number(number)];

            const key = `${number}_${index}`;

            return <Icon key={key} />;
          })}
      </Button>
    );
  };
};

export default Day;

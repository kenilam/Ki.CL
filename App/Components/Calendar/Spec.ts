import type { HTMLAttributes } from 'react';

export type CalendarMode = 'single' | 'range';

export type DateRange = {
  from?: Date;
  to?: Date;
};

type CalendarBaseProps = Omit<HTMLAttributes<HTMLDivElement>, 'onSelect'> & {
  defaultMonth?: Date;
  disabled?: (date: Date) => boolean;
};

export type CalendarSingleProps = CalendarBaseProps & {
  mode?: 'single';
  selected?: Date;
  onSelect?: (date: Date | undefined) => void;
};

export type CalendarRangeProps = CalendarBaseProps & {
  mode: 'range';
  selected?: DateRange;
  onSelect?: (range: DateRange | undefined) => void;
};

export type CalendarProps = CalendarSingleProps | CalendarRangeProps;

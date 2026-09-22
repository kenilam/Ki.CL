import type { CalendarProps, DateRange } from './spec';

export const startOfDay = (date: Date) => {
  const next = new Date(date);
  next.setHours(0, 0, 0, 0);
  return next;
};

export const sameDay = (a?: Date, b?: Date) => {
  if (!a || !b) {
    return false;
  }
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
};

export const isBefore = (a: Date, b: Date) => a.getTime() < b.getTime();

export const isInRange = (date: Date, range?: DateRange) => {
  if (!range?.from || !range.to) {
    return false;
  }
  const time = date.getTime();
  const from = startOfDay(range.from).getTime();
  const to = startOfDay(range.to).getTime();
  return time > from && time < to;
};

export const monthLabel = (date: Date) =>
  date.toLocaleString(undefined, {
    month: 'long',
    year: 'numeric',
  });

export const seedMonth = (props: CalendarProps) => {
  if (props.defaultMonth) {
    return props.defaultMonth;
  }
  if (props.mode === 'range') {
    return props.selected?.from ?? props.selected?.to ?? new Date();
  }
  return props.selected ?? new Date();
};

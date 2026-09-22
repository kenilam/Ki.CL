import { createContext, useContext } from 'react';

import type { CalendarMode, DateRange } from './spec';

export type CalendarContextValue = {
  disabled?: (date: Date) => boolean;
  mode: CalendarMode;
  month: Date;
  onDayClick: (date: Date) => void;
  selectedRange?: DateRange;
  selectedSingle?: Date;
  setMonth: (month: Date) => void;
  today: Date;
};

export const CalendarContext = createContext<CalendarContextValue | null>(null);

export const useCalendar = () => {
  const ctx = useContext(CalendarContext);
  if (!ctx) {
    throw new Error('Calendar parts must be used within Calendar');
  }
  return ctx;
};

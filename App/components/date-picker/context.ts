import { createContext, useContext } from 'react';

import type { DateRange } from '@/components/calendar';

import type { DatePickerMode } from './spec';

export type DatePickerContextValue = {
  disabled?: boolean;
  label: string | null;
  mode: DatePickerMode;
  onSelectRange: (range: DateRange | undefined) => void;
  onSelectSingle: (date: Date | undefined) => void;
  placeholder: string;
  selectedRange?: DateRange;
  selectedSingle?: Date;
};

export const DatePickerContext = createContext<DatePickerContextValue | null>(
  null
);

export const useDatePicker = () => {
  const ctx = useContext(DatePickerContext);
  if (!ctx) {
    throw new Error('DatePicker parts must be used within DatePicker');
  }
  return ctx;
};

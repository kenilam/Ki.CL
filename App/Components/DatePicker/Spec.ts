import type { ReactNode } from 'react';

import type { DateRange } from '@/Components/Calendar';

export type DatePickerMode = 'single' | 'range';

type DatePickerBaseProps = {
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  /** Optional format override - default uses locale date string. */
  formatDate?: (date: Date) => string;
  children?: ReactNode;
};

export type DatePickerSingleProps = DatePickerBaseProps & {
  mode?: 'single';
  value?: Date;
  defaultValue?: Date;
  onValueChange?: (date: Date | undefined) => void;
};

export type DatePickerRangeProps = DatePickerBaseProps & {
  mode: 'range';
  value?: DateRange;
  defaultValue?: DateRange;
  onValueChange?: (range: DateRange | undefined) => void;
};

export type DatePickerProps = DatePickerSingleProps | DatePickerRangeProps;

import type React from 'react';

import type { DateRange } from '@/components/calendar';

export type DatePickerMode = 'single' | 'range';

/** Forwarded to the trigger button, so FormControl and FormLabel can name it. */
export type DatePickerTriggerProps = Pick<
  React.ComponentPropsWithoutRef<'button'>,
  'aria-describedby' | 'aria-invalid' | 'aria-label' | 'aria-labelledby' | 'id'
>;

type DatePickerBaseProps = DatePickerTriggerProps & {
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  /** Optional format override - default uses locale date string. */
  formatDate?: (date: Date) => string;
  children?: React.ReactNode;
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

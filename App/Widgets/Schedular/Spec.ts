import React from 'react';

import { DatePickerProps } from 'react-datepicker';

export type Props = Omit<
  DatePickerProps,
  | 'calendarContainer'
  | 'calendarClassName'
  | 'excludeScrollbar'
  | 'renderCustomHeader'
> & {
  footer?: React.ReactNode;
};

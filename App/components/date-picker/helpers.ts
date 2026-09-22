import type { DateRange } from '@/components/calendar';

export const defaultFormatDate = (date: Date) =>
  date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

export const formatRange = (
  range: DateRange | undefined,
  formatDate: (date: Date) => string
) => {
  if (!range?.from) {
    return null;
  }
  if (!range.to || range.from.getTime() === range.to.getTime()) {
    return formatDate(range.from);
  }
  return `${formatDate(range.from)} - ${formatDate(range.to)}`;
};

import React from 'react';

// Components
import { Calendar as MonthGrid } from '@/components/calendar';

// Context
import { useDatePicker } from '@/components/date-picker/context';

const Calendar: React.FunctionComponent = () => {
  const { mode, onSelectRange, onSelectSingle, selectedRange, selectedSingle } =
    useDatePicker();

  return mode === 'range' ? (
    <MonthGrid mode='range' selected={selectedRange} onSelect={onSelectRange} />
  ) : (
    <MonthGrid
      mode='single'
      selected={selectedSingle}
      onSelect={onSelectSingle}
    />
  );
};

export { Calendar };

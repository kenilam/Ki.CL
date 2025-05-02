import React from 'react';

// Components
import { Text } from '@/Components';

const CLASS_NAME = 'kicl--widgets--schedular--month';

const Month = (
  _m: number,
  shortMonthText: string,
  _fullMonthText: string,
  _day: Date
) => {
  return (
    <Text className={CLASS_NAME} is='span'>
      {shortMonthText}
    </Text>
  );
};

export default Month;

import React from 'react';

import { useResponsive } from 'design/hooks';

import { Top as Button } from '@/views/top';

const Top: React.FunctionComponent = () => {
  const { isNarrow } = useResponsive();

  return isNarrow ? <Button /> : null;
};

export { Top };

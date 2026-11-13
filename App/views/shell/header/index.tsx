import React from 'react';

import { GlobalHeader } from 'design/widgets';

import { Language } from '@/views/language';
import { Navigation } from '@/views/navigation';

const Header: React.FunctionComponent = () => {
  return (
    <GlobalHeader after={<Language />}>
      <Navigation />
    </GlobalHeader>
  );
};

export { Header };

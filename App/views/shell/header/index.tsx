import React from 'react';

// Routes
import { useLocation } from 'design/router';

// Widgets
import { GlobalHeader } from 'design/widgets';

// Partials
import { Language } from '@/views/language';
import { Navigation } from '@/views/navigation';

// Constants
import { PATH as HOME_PATH } from '@/views/home';

const Header: React.FunctionComponent = () => {
  const { pathname } = useLocation();

  const isHome = pathname.replace('/', '') === HOME_PATH;

  return (
    <GlobalHeader after={<Language />} hidden={isHome}>
      <Navigation />
    </GlobalHeader>
  );
};

export { Header };

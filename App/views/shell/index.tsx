import React from 'react';

// Routes
import { ScrollRestoration } from 'design/router';

// Partials
import { Header } from './header';
import { Main } from './main';
import { SkipLink } from '@/views/skip-link';

const Shell: React.FunctionComponent = () => {
  return (
    <>
      <ScrollRestoration />
      <SkipLink />
      <Header />
      <Main />
    </>
  );
};

export { Shell };

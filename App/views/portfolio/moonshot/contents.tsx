import React from 'react';

// Routes
import { Routes } from 'design/router';

// Remote
import { Compose } from 'moonshot/compose';
import { Introduction } from 'moonshot/introduction';
import { Review } from 'moonshot/review';

/** The remote's routes, relative to `/portfolio/moonshot`. */
const Contents: React.FunctionComponent = () => (
  <Routes>
    {Introduction}
    {Compose}
    {Review}
  </Routes>
);

export { Contents };

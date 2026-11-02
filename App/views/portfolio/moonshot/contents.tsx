import React from 'react';

// Routes
import { Routes } from 'design/router';

const [{ Compose }, { Introduction }, { Review }] = await Promise.all([
  import('moonshot/compose'),
  import('moonshot/introduction'),
  import('moonshot/review'),
]);

/** The remote's routes, relative to `/portfolio/moonshot`. */
const Contents: React.FunctionComponent = () => (
  <Routes>
    {Introduction}
    {Compose}
    {Review}
  </Routes>
);

export { Contents };

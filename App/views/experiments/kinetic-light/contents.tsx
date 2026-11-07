import React from 'react';

// Routes
import { Outlet } from 'design/router';

// Hooks
import { useSongs } from './songs/use-songs';
import { useGenerate } from './use-generate';

// Context
import { KineticLightProvider } from './context';

const Contents: React.FunctionComponent = () => {
  const generate = useGenerate();
  const { examples, songs } = useSongs(generate.busy);

  return (
    <KineticLightProvider examples={examples} generate={generate} songs={songs}>
      <Outlet />
    </KineticLightProvider>
  );
};

export { Contents };

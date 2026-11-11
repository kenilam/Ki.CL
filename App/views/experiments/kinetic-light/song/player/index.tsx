import React, { PropsWithChildren } from 'react';

// Context
import { Provider as Song } from '@/views/experiments/kinetic-light/song/context';

// Partials
import { Contents } from './contents';
import { Provider } from './context';

const Player: React.FunctionComponent<PropsWithChildren> = ({ children }) => {
  return (
    <Song>
      <Provider>
        <Contents>{children}</Contents>
      </Provider>
    </Song>
  );
};

export { Player };

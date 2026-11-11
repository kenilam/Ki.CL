import React from 'react';

// Partials
import { Panel } from './panel';
import { Provider } from './context';

// Constants
import type { SCREENS } from '@/views/experiments/home/stage/screens';

type Props = Pick<(typeof SCREENS)[number]['experiment'], 'plate'>;

const Screen: React.FunctionComponent<Props> = ({ plate }) => {
  return (
    <Provider plate={plate}>
      <Panel />
    </Provider>
  );
};

export { Screen };

import React from 'react';

import { Provider as Active } from '@/views/active/context';
import { Provider as Anchor } from '@/views/anchor/context';
import { Provider as Ready } from '@/views/ready/context';

import { Provider } from './context';
import { Page } from './page';

const Resume: React.FunctionComponent = () => {
  return (
    <Provider>
      <Active>
        <Anchor>
          <Ready>
            <Page />
          </Ready>
        </Anchor>
      </Active>
    </Provider>
  );
};

export { Resume };

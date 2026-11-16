import React from 'react';

import { Provider as Active } from '@/views/about/active/context';
import { Provider as Ready } from '@/views/about/ready/context';

import { Provider } from './context';
import { Page } from './page';

const Resume: React.FunctionComponent = () => {
  return (
    <Provider>
      <Active>
        <Ready>
          <Page />
        </Ready>
      </Active>
    </Provider>
  );
};

export { Resume };

import React from 'react';

// Libraries
import classNames from 'classnames';

// Components
import { Layout } from 'design/components';

// Partials
import { Page } from './page';

// Constants
import { MAIN_ID } from '@/views/constants';

const Main: React.FunctionComponent = () => {
  return (
    <Layout
      alignContent='start'
      alignItems='start'
      gap='none'
      justifyContent='stretch'
      justifyItems='center'
    >
      <main
        className={classNames(
          'kicl--view',
          'kicl-inline-size-full',
          'kicl-min-block-size-screen'
        )}
        id={MAIN_ID}
        tabIndex={-1}
      >
        <Page />
      </main>
    </Layout>
  );
};

export { Main };

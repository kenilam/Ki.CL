import React from 'react';

// Libraries
import classNames from 'classnames';

// Components
import { Layout } from 'design/components';

// Views
import { Published } from '@/views/blog/published';

// Partials
import { Lead } from '@/views/blog/spatial-css/intro/lead';
import { Support } from '@/views/blog/spatial-css/intro/support';
import { Slot } from '@/views/blog/spatial-css/article/slot';
import { Title } from '@/views/blog/spatial-css/intro/title';

// Constants
import { TO } from '@/views/blog/spatial-css/constants';

const Narrow: React.FunctionComponent = () => {
  return (
    <Layout autoFlow='row' gap='wide'>
      <div
        className={classNames(
          'kicl-grid-template-columns-shrink',
          'kicl-grid-template-rows-1fr-auto'
        )}
      >
        <Layout autoFlow='row' gap='normal' justifyItems='start'>
          <div
            className={classNames(
              'kicl-align-self-center',
              'kicl-grid-column-1',
              'kicl-scroll-leave-far'
            )}
          >
            <Slot id='intro' />
            <Support />
            <Title />
          </div>
        </Layout>
        <Layout autoFlow='row' gap='narrower' justifyItems='start'>
          <div
            className={classNames(
              'kicl-padding-inline-end-extreme',
              'kicl-scroll-leave-near'
            )}
          >
            <Published to={TO} />
            <Lead />
          </div>
        </Layout>
      </div>
    </Layout>
  );
};

export { Narrow };

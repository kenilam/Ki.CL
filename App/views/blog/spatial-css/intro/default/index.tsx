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
import { Title } from '@/views/blog/spatial-css/intro/title';

// Constants
import { TO } from '@/views/blog/spatial-css/constants';

const Default: React.FunctionComponent = () => {
  return (
    <Layout autoFlow='column' frames='1fr--5fr--6fr' gap='wide'>
      <div
        className={classNames(
          'kicl-grid-template-rows-1fr-auto',
          'kicl-text-align-end'
        )}
      >
        <Layout autoFlow='row' gap='normal' justifyItems='end'>
          <div
            className={classNames(
              'kicl-align-self-center',
              'kicl-grid-column-2',
              'kicl-scroll-leave-far'
            )}
          >
            <Support />
            <Title />
          </div>
        </Layout>
        <Layout autoFlow='row' gap='narrower' justifyItems='start'>
          <div
            className={classNames(
              'kicl-grid-column-3',
              'kicl-grid-row-2',
              'kicl-scroll-leave-near',
              'kicl-text-align-start'
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

export { Default };

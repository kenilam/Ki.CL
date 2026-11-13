import React from 'react';

// Routes
import { Outlet } from 'design/router';

// Components
import { Animation, Layout } from 'design/components';

// Constants
import { CONTENT_DELAY } from '@/views/constants';

const CLASS_NAME = 'kicl--views--experiments';

const Experiments: React.FunctionComponent = () => {
  return (
    <Animation delay={CONTENT_DELAY}>
      <Layout
        autoFlow='row'
        fullScreen
        gap='none'
        justifyContent='stretch'
        justifyItems='center'
      >
        <section className={CLASS_NAME}>
          <Outlet />
        </section>
      </Layout>
    </Animation>
  );
};

export { Experiments };

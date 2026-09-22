import React from 'react';

// Routes
import { Outlet } from '@/router';

// Components
import { Animation, Layout } from '@/components';

const CLASS_NAME = 'kicl--views--experiments';

const Experiments: React.FunctionComponent = () => {
  return (
    <Animation delay={1000}>
      <Layout
        autoFlow='row'
        fullScreen
        gap='none'
        justifyContent='stretch'
        justifyItems='center'
      >
        <div className={CLASS_NAME}>
          <Outlet />
        </div>
      </Layout>
    </Animation>
  );
};

export { Experiments };

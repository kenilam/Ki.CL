import React from 'react';

// Libraries
import classNames from 'classnames';

// Routes
import { Outlet } from 'design/router';

// Components
import { Animation, Layout } from 'design/components';

const CLASS_NAME = 'kicl--views--portfolio';

const Portfolio: React.FunctionComponent = () => {
  return (
    <Animation delay={1000}>
      <Layout
        autoFlow='row'
        gap='none'
        justifyContent='stretch'
        justifyItems='stretch'
      >
        {/* The page's width: `main` centres its children, and a frame inside sizes from here. */}
        <div className={classNames(CLASS_NAME, 'kicl-inline-size-full')}>
          <Outlet />
        </div>
      </Layout>
    </Animation>
  );
};

export { Portfolio };

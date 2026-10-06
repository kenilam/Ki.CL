import React, { Suspense } from 'react';

// Routes
import { Outlet } from 'design/router';

// Components
import { Animation, Layout, Spinner } from 'design/components';

/** Every page here is one card in the middle of the screen. */
const Me: React.FunctionComponent = () => {
  return (
    <Animation>
      <Layout
        alignContent='center'
        autoFlow='row'
        fullScreen
        justifyContent='center'
        justifyItems='center'
      >
        <section>
          <Suspense fallback={<Spinner />}>
            <Outlet />
          </Suspense>
        </section>
      </Layout>
    </Animation>
  );
};

export { Me };

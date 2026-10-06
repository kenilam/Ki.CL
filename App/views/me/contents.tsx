import React, { Suspense } from 'react';

// Libraries
import classNames from 'classnames';

// Routes
import { Outlet } from 'design/router';

// Components
import { Animation, Frame, Layout, Spinner } from 'design/components';

// Widgets
import { Background } from 'design/widgets';

// Views
import { CONTENT_DELAY, FRAME_DELAY } from '@/views/home/constants';

/**
 * Every page here is one card in the middle of the frame, over the home
 * page's light.
 */
const Me: React.FunctionComponent = () => {
  return (
    <Layout
      alignContent='center'
      autoFlow='row'
      justifyContent='center'
      justifyItems='center'
    >
      {/* Grows, with room above and below the card, for a window shorter than the page. */}
      <Frame delay={FRAME_DELAY} grow>
        <section
          className={classNames(
            'kicl-padding-block-frame',
            'kicl-position-relative'
          )}
        >
          <Animation delay={CONTENT_DELAY}>
            <Background />
          </Animation>
          <Suspense fallback={<Spinner />}>
            <Outlet />
          </Suspense>
        </section>
      </Frame>
    </Layout>
  );
};

export { Me };

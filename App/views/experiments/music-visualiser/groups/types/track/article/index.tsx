import React from 'react';

// Libraries
import classNames from 'classnames';

// Routes
import { Outlet, useMatch } from 'design/router';

// Components
import { Frame, Layout } from 'design/components';

// Partials
import { Chrome } from '@/views/experiments/music-visualiser/groups/types/track/chrome';
import { Gate } from '@/views/experiments/music-visualiser/groups/types/track/gate';
import { Picture } from './picture';

// Constants
import {
  CLASS_NAME as VIEW,
  PLAY_ROUTE,
} from '@/views/experiments/music-visualiser/constants';

/** The picture, and over it the gate or, on `/play`, the player. */
const Article: React.FunctionComponent = () => {
  const isPlay = Boolean(useMatch(PLAY_ROUTE));

  return (
    <Layout autoFlow='row' gap='none'>
      {/* The frame clips the picture and the player to the window. */}
      <Frame>
        <article
          className={classNames(`${VIEW}__track`, 'kicl-position-relative')}
        >
          <Picture />
          {isPlay ? <Chrome /> : <Gate />}
          <Outlet />
        </article>
      </Frame>
    </Layout>
  );
};

export { Article };

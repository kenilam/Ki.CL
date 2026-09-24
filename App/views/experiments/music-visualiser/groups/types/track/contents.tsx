import React from 'react';

// Libraries
import classNames from 'classnames';

// Routes
import { Navigate, Outlet, useMatch, useParams } from '@/router';

// Components
import { Frame, Layout } from '@/components';

// Catalog
import { keyOf } from '@/views/experiments/music-visualiser/catalog';

// Hooks
import { useAudio } from './use-audio';

// Context
import { TrackProvider } from './context';

// Partials
import { Chrome } from './chrome';
import { Gate } from './gate';
import { Visualiser } from './visualiser';

// Styles
import './styles.scss';

// Constants
import {
  CLASS_NAME as VIEW,
  PARAMS,
  PLAY_ROUTE,
  toPath,
} from '@/views/experiments/music-visualiser/constants';

/**
 * `/:track` - the picture, and over it the gate or, on `/play`, the player.
 * An id the catalogue does not have goes back to its type, which draws one.
 */
const Contents: React.FunctionComponent = () => {
  const { analyser, control, next, track } = useAudio();
  const isPlay = Boolean(useMatch(PLAY_ROUTE));
  const { [PARAMS.group]: group, [PARAMS.type]: type } = useParams();

  if (!track) {
    return <Navigate to={toPath({ group, type })} replace />;
  }

  return (
    <TrackProvider control={control} next={next} track={track}>
      <Layout autoFlow='row' gap='none'>
        <Frame>
          <div
            className={classNames(`${VIEW}__track`, 'kicl-position-relative')}
          >
            <Visualiser
              analyser={analyser}
              playing={control.playing}
              track={keyOf(track)}
            />
            {isPlay ? <Chrome /> : <Gate />}
            <Outlet />
          </div>
        </Frame>
      </Layout>
    </TrackProvider>
  );
};

export { Contents };

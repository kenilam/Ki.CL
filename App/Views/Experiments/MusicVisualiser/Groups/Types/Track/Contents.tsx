import React from 'react';

// Libraries
import classNames from 'classnames';

// Routes
import { Navigate, Outlet, useMatch, useParams } from '@/Router';

// Components
import { Layout } from '@/Components';

// Catalog
import { keyOf } from '@/Views/Experiments/MusicVisualiser/Catalog';

// Hooks
import useAudio from './useAudio';

// Partials
import Chrome from './Chrome';
import Gate from './Gate';
import Visualiser from './Visualiser';

// Styles
import './Styles.scss';

// Constants
import {
  CLASS_NAME as VIEW,
  PARAMS,
  PLAY_ROUTE,
  toPath,
} from '@/Views/Experiments/MusicVisualiser/constants';

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
    <Layout autoFlow='row' gap='none'>
      <div className={classNames(`${VIEW}__track`, 'kicl-position-relative')}>
        <Visualiser
          analyser={analyser}
          playing={control.playing}
          track={keyOf(track)}
        />
        {isPlay ? (
          <Chrome control={control} next={next} track={track} />
        ) : (
          <Gate track={track} />
        )}
        <Outlet />
      </div>
    </Layout>
  );
};

export default Contents;

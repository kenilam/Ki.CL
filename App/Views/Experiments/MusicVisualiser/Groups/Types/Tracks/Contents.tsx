import React, { useEffect, useState } from 'react';

// Routes
import { Navigate, Outlet, useParams } from '@/Router';

// Components
import { Spinner } from '@/Components';

// Spec
import type { Track } from '@/Views/Experiments/MusicVisualiser/Spec';

// Context
import { TrackContext } from '@/Views/Experiments/MusicVisualiser/Context';

// Providers
import radio from '@/Views/Experiments/MusicVisualiser/Providers';

// Constants
import { PARAMS, toPath } from '@/Views/Experiments/MusicVisualiser/constants';

type Params = {
  [PARAMS.group]?: string;
  [PARAMS.track]?: string;
  [PARAMS.type]?: string;
};

/**
 * `/:group/:type/:trackId` - one piece. Resolves it from the station and
 * hands it to whatever is beneath: the gate, or the player. An id the
 * station cannot resolve goes back to the type, whose index picks another.
 * While a new id resolves the last track stays, so moving from one track's
 * player to the next never passes through nothing.
 */
const Contents: React.FunctionComponent = () => {
  const params = useParams<Params>();
  const group = params[PARAMS.group];
  const type = params[PARAMS.type];
  const id = params[PARAMS.track];
  const [track, setTrack] = useState<Track | null>(null);
  const [missing, setMissing] = useState(false);

  useEffect(() => {
    if (!group || !type || !id) {
      return;
    }

    let cancelled = false;

    setMissing(false);

    void radio
      .get(group, type, id)
      .then((found) => {
        if (cancelled) {
          return;
        }

        if (found) {
          setTrack(found);
        } else {
          setMissing(true);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setMissing(true);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [group, id, type]);

  if (missing) {
    return <Navigate to={toPath({ group, type })} replace />;
  }

  if (!track) {
    return <Spinner position='inline' />;
  }

  return (
    <TrackContext.Provider value={track}>
      <Outlet />
    </TrackContext.Provider>
  );
};

export default Contents;

import React, { Suspense, useEffect, useState } from 'react';

// Routes
import { Navigate, Route, useParams } from '@/Router';

// Components
import { Spinner } from '@/Components';

// Providers
import radio from '@/Views/Experiments/MusicVisualiser/Providers';

// Resolve
import resolve, { type Params } from './resolve';

// Tracks
import Tracks from './Tracks';

// Constants
import {
  TYPE_PATTERN,
  toPath,
  toTrackPath,
} from '@/Views/Experiments/MusicVisualiser/constants';

const Contents = React.lazy(() => import('./Contents'));

const Lazy: React.FunctionComponent = () => {
  return (
    <Suspense fallback={<Spinner position='inline' />}>
      <Contents />
    </Suspense>
  );
};

/**
 * The type's index: its first track. A station's tracks are not a list to
 * take the head of - the built-in one has ten thousand a family - so the
 * first available child is the one the station would play next.
 */
const FirstTrack: React.FunctionComponent = () => {
  const { group, provider, type } = resolve(useParams<Params>());
  const [path, setPath] = useState<string | null>(null);

  useEffect(() => {
    if (!provider || !type) {
      return;
    }

    let cancelled = false;

    void radio
      .next([], provider.group, type)
      .then((track) => {
        if (!cancelled) {
          setPath(toTrackPath(track));
        }
      })
      .catch(() => {
        if (!cancelled) {
          setPath(toPath({ group }));
        }
      });

    return () => {
      cancelled = true;
    };
  }, [group, provider, type]);

  if (!provider || !type) {
    return <Navigate to={toPath({ group })} replace />;
  }

  if (!path) {
    return <Spinner position='inline' />;
  }

  return <Navigate to={path} replace />;
};

/** `/:group/:type` - a family; its index redirects to a track of it. */
export default (
  <Route path={TYPE_PATTERN} element={<Lazy />}>
    <Route index element={<FirstTrack />} />
    {Tracks}
  </Route>
);

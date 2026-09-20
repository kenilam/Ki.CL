import React, { useEffect, useState } from 'react';

// Routes
import { Navigate, Outlet, Route, useParams } from '@/Router';

// Components
import { Spinner } from '@/Components';

// Spec
import type { VibeFamily } from '@/Views/Experiments/MusicVisualiser/Spec';

// Providers
import radio from '@/Views/Experiments/MusicVisualiser/Providers';

// Tracks
import Tracks from './Tracks';

// Constants
import {
  PARAMS,
  TYPE_PATTERN,
  toPath,
  toTrackPath,
} from '@/Views/Experiments/MusicVisualiser/constants';

type Params = { [PARAMS.group]?: string; [PARAMS.type]?: string };

function resolve(params: Params) {
  const group = params[PARAMS.group];
  const type = params[PARAMS.type];
  const provider = group ? radio.group(group) : undefined;
  const known =
    provider && type && (provider.types as string[]).includes(type)
      ? (type as VibeFamily)
      : null;

  return { group, provider, type: known };
}

/**
 * `/:group/:type` - a family within a station. An unknown type goes to the
 * group's first; a known one renders whatever is beneath it.
 */
const Type: React.FunctionComponent = () => {
  const { group, provider, type } = resolve(useParams<Params>());

  if (!provider) {
    return <Navigate to={toPath()} replace />;
  }

  if (!type) {
    return <Navigate to={toPath({ group })} replace />;
  }

  return <Outlet />;
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

export default (
  <Route path={TYPE_PATTERN} element={<Type />}>
    <Route index element={<FirstTrack />} />
    {Tracks}
  </Route>
);

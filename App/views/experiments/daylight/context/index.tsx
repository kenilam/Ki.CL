import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useRef,
} from 'react';

// Routes
import { Navigate, useNavigate, useParams } from 'design/router';

// Hooks
import { useArrows } from '@/views/experiments/daylight/use-arrows';
import { useNow } from '@/views/experiments/daylight/use-now';

// Utilities
import { toNearestHere } from '@/views/experiments/daylight/nearest';

// Constants
import {
  PARAM,
  PLACES,
  toPath,
  toSlug,
} from '@/views/experiments/daylight/constants';

type Value = {
  /** Index of the place the address names. */
  active: number;
  article: React.RefObject<HTMLElement | null>;
  now: Date;
};

const DaylightContext = createContext<Value | null>(null);

/**
 * The address names the place the globe faces. With no place, or one it
 * does not know, it goes to the place nearest the visitor.
 */
const Provider: React.FunctionComponent<PropsWithChildren> = ({ children }) => {
  const now = useNow();
  const navigate = useNavigate();
  const { [PARAM]: slug } = useParams();
  const active = PLACES.findIndex((place) => {
    return toSlug(place) === slug;
  });

  const article = useRef<HTMLElement>(null);

  useArrows((place) => {
    return navigate(toPath(place));
  });

  if (active < 0) {
    return <Navigate replace to={toPath(toNearestHere(now))} />;
  }

  return (
    <DaylightContext.Provider value={{ active, article, now }}>
      {children}
    </DaylightContext.Provider>
  );
};

const useDaylightContext = (): Value => {
  const value = useContext(DaylightContext);

  if (!value) {
    throw new Error('useDaylightContext needs a DaylightContext above it.');
  }

  return value;
};

export { Provider, useDaylightContext };

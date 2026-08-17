import React, { useCallback, useState } from 'react';

import { isAuthenticated } from 'api/provider';

// Routes
import { Outlet } from '@/Router';

// Partials
import SignIn from './SignIn';

/**
 * Everything under /portfolio/pika is shared with a small audience on
 * purpose — the gate rides the platform's existing credential flow (SignIn
 * mutation + `aud` session cookie) rather than inventing a second one.
 */
const Pika: React.FunctionComponent = () => {
  const [authenticated, setAuthenticated] = useState(isAuthenticated);

  const onSignedIn = useCallback(() => {
    setAuthenticated(true);
  }, []);

  if (!authenticated) {
    return <SignIn onSignedIn={onSignedIn} />;
  }

  return <Outlet />;
};

export default Pika;

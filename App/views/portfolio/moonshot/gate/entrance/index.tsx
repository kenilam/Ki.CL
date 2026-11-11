import React from 'react';

// Routes
import { Outlet } from 'design/router';

// Context
import { useAccessContext } from '@/views/portfolio/moonshot/gate/context';

// Partials
import { SignIn } from './sign-in';

/** The piece, once the visitor may see it, and the sign-in until then. */
const Entrance: React.FunctionComponent = () => {
  const { allowed } = useAccessContext();

  if (!allowed) {
    return <SignIn />;
  }

  return <Outlet />;
};

export { Entrance };

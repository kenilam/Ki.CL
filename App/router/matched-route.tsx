import React, { PropsWithChildren, Suspense } from 'react';

// Router
import {
  Props as MatchPatternProps,
  useMatchPattern,
} from './use-match-pattern';

// HttpStatus
import { Status404 } from 'design/status';

// Components
import { Spinner } from 'design/components';

// Spec
type Props = MatchPatternProps & {
  fallback?: React.ReactNode;
};

const MatchedRoute: React.FunctionComponent<PropsWithChildren<Props>> = ({
  children,
  fallback,
  ...rest
}) => {
  const match = useMatchPattern(rest);

  if (!match) {
    return fallback || <Status404 />;
  }

  return <Suspense fallback={<Spinner />}>{children}</Suspense>;
};

export { MatchedRoute, type Props };

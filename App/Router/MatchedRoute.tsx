import React, { PropsWithChildren, Suspense } from 'react';

// Router
import useMatchPattern, { Props as MatchPatternProps } from './useMatchPattern';

// HttpStatus
import * as HttpStatus from './HttpStatus';

// Components
import { Spinner } from '@/Components';

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
    return fallback || <HttpStatus.Status404 />;
  }

  return <Suspense fallback={<Spinner />}>{children}</Suspense>;
};

export { type Props };

export default MatchedRoute;

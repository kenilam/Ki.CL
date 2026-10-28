import React from 'react';

// Routes
import { Navigate, Route, useParams } from 'design/router';

// Constants
import { NODE_PATTERN, ROOT_NODE_ID, toPath } from './constants';

const Redirect: React.FunctionComponent = () => {
  const { nodeId, '*': rest = '' } = useParams();

  return (
    <Navigate replace to={[toPath(nodeId), rest].filter(Boolean).join('/')} />
  );
};

const VersionsRedirect = (
  <>
    <Route
      path={`versions/:version/${NODE_PATTERN}/*`}
      element={<Redirect />}
    />
    <Route
      path='versions/*'
      element={<Navigate replace to={toPath(ROOT_NODE_ID)} />}
    />
  </>
);

export { VersionsRedirect };

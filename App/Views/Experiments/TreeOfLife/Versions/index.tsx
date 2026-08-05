import React from 'react';

// Routes
import { Navigate, Route, Outlet } from '@/Router';

// Constants
import { ROOT_NODE_ID } from '@/Views/Experiments/TreeOfLife/constants';
import { PATH, VERSIONS } from './constants';
import Selector from './Selector';

const Element: React.FunctionComponent = () => {
  return (
    <>
      <Outlet />
      <Selector />
    </>
  );
};

export { PATH };

export default (
  <Route path={PATH} element={<Element />}>
    {VERSIONS.map((version) => (
      <Route key={version} path={version}>
        <Route index element={<Navigate replace to={ROOT_NODE_ID} />} />
        <Route
          path=':nodeId'
          lazy={async () => ({
            Component: (await import(`./v${version}`)).default,
          })}
        />
      </Route>
    ))}
  </Route>
);

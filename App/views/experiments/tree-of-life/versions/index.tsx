// Routes
import { Navigate, Route } from '@/router';

// Constants
import { ROOT_NODE_ID } from '@/views/experiments/tree-of-life/constants';
import { PATH, VERSIONS } from './constants';

const Versions = (
  <Route
    path={PATH}
    lazy={async () => ({
      Component: (await import('./contents')).Contents,
    })}
  >
    <Route index element={<Navigate replace to='..' />} />
    {VERSIONS.map((version) => (
      <Route key={version} path={version}>
        <Route index element={<Navigate replace to={ROOT_NODE_ID} />} />
        <Route
          path=':nodeId'
          lazy={async () => ({
            Component: (await import(`./v${version}`)).Canvas,
          })}
        />
      </Route>
    ))}
  </Route>
);

export { PATH, Versions };

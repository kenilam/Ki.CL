import React from 'react';

// Routes
import { Navigate, Route as Origin } from '@/Router';

// Components
import { Spinner } from '@/Components';

// Constants
import {
  ARCHIVE,
  NODE_PATTERN,
  ROOT_NODE_ID,
  toArchivePath,
  type ArchivedVersion,
} from './constants';

/**
 * The earlier attempts, still reachable.
 *
 * Each is loaded only when its route is, so keeping fourteen of them costs
 * nothing until somebody asks for one — a visitor who never opens the archive
 * downloads none of it.
 *
 * The import paths are spelled out rather than built from the version name.
 * A bundler resolves these at build time and cannot follow a computed path,
 * so a template string here would produce fourteen routes that fail to load
 * at run time.
 */
const LOADERS: Record<
  ArchivedVersion,
  React.LazyExoticComponent<React.ComponentType>
> = {
  v1: React.lazy(() => import('./v1')),
  v2: React.lazy(() => import('./v2')),
  v3: React.lazy(() => import('./v3')),
  v4: React.lazy(() => import('./v4')),
  v5: React.lazy(() => import('./v5')),
  v6: React.lazy(() => import('./v6')),
  v7: React.lazy(() => import('./v7')),
  v8: React.lazy(() => import('./v8')),
  v9: React.lazy(() => import('./v9')),
  v10: React.lazy(() => import('./v10')),
  v11: React.lazy(() => import('./v11')),
  v12: React.lazy(() => import('./v12')),
  v13: React.lazy(() => import('./v13')),
  v14: React.lazy(() => import('./v14')),
};

const Archived: React.FunctionComponent<{ version: ArchivedVersion }> = ({
  version,
}) => {
  const Canvas = LOADERS[version];

  return (
    <React.Suspense fallback={<Spinner position='inline' />}>
      <Canvas />
    </React.Suspense>
  );
};

/**
 * One branch per archived version, each mirroring the live view's shape: a
 * node route, and a bare path that resolves onto the origin rather than
 * leaving the version without a subject.
 */
const archiveRoutes = ARCHIVE.map((version) => (
  <Origin key={version} path={version}>
    <Origin
      index
      element={<Navigate replace to={toArchivePath(version, ROOT_NODE_ID)} />}
    />
    <Origin path={NODE_PATTERN} element={<Archived version={version} />} />
  </Origin>
));

export default archiveRoutes;

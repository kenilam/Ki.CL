import { PATH as EXPERIMENTS } from '@/Views/Experiments/constants';

import { ROOT_OTT_ID } from './tree';

/** Route segment for this view. */
const PATH = 'tree-of-life';

/** Dynamic segment carrying the focused node — `/:nodeId`. */
const PARAM = 'nodeId';

/** Child route pattern, relative to `PATH`. */
const NODE_PATTERN = `:${PARAM}`;

/**
 * Origin of life. OTOL names a node for a known taxon `ott<ottId>`, so the
 * synthetic root is addressable without a round trip — which is what lets the
 * index route redirect declaratively instead of waiting on a fetch.
 */
const ROOT_NODE_ID = `ott${ROOT_OTT_ID}`;

/**
 * Absolute path for a node, or for the view itself when no node is given.
 * The URL is the single source of truth for what is focused, so every
 * navigation — click, search, or scroll — resolves through here.
 */
const toPath = (nodeId?: string | null): string =>
  nodeId ? `/${EXPERIMENTS}/${PATH}/${nodeId}` : `/${EXPERIMENTS}/${PATH}`;

/**
 * The versions kept around, oldest first.
 *
 * Each was a whole attempt at drawing the tree rather than a revision of the
 * last, so they are worth keeping side by side — the interesting part is how
 * differently the same data can read.
 */
const ARCHIVE = [
  'v1',
  'v2',
  'v3',
  'v4',
  'v5',
  'v6',
  'v7',
  'v8',
  'v9',
  'v10',
  'v11',
  'v12',
  'v13',
  'v14',
] as const;

export type ArchivedVersion = (typeof ARCHIVE)[number];

/**
 * A node under one of the archived versions.
 *
 * The version is a literal segment, so `/tree-of-life/v3/ott123` cannot be
 * mistaken for a node called `v3` — a static segment outranks `:nodeId` in
 * the router's own ordering, and nothing about the current path changes.
 */
type ToArchivePathProps = {
  version?: ArchivedVersion;
  nodeId?: string | null;
};
const toArchivePath = ({ version, nodeId }: ToArchivePathProps): string => {
  return `/${[EXPERIMENTS, PATH, version, nodeId].filter(Boolean).join('/')}`;
};

export {
  ARCHIVE,
  NODE_PATTERN,
  PARAM,
  PATH,
  ROOT_NODE_ID,
  toArchivePath,
  toPath,
};

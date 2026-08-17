import { PATH as EXPERIMENTS } from '@/Views/Experiments/constants';

import { ROOT_OTT_ID } from './tree';

/** Route segment for this view. */
const PATH = 'tree-of-life';

/** Dynamic segment carrying the focused node - `/:nodeId`. */
const PARAM = 'nodeId';

/** Child route pattern, relative to `PATH`. */
const NODE_PATTERN = `:${PARAM}`;

/**
 * Origin of life. OTOL names a node for a known taxon `ott<ottId>`, so the
 * synthetic root is addressable without a round trip - which is what lets the
 * index route redirect declaratively instead of waiting on a fetch.
 */
const ROOT_NODE_ID = `ott${ROOT_OTT_ID}`;

/**
 * Absolute path for a node, or for the view itself when no node is given.
 * The URL is the single source of truth for what is focused, so every
 * navigation - click, search, or scroll - resolves through here.
 */
const toPath = (nodeId?: string | null): string =>
  nodeId ? `/${EXPERIMENTS}/${PATH}/${nodeId}` : `/${EXPERIMENTS}/${PATH}`;

export { NODE_PATTERN, PARAM, PATH, ROOT_NODE_ID, toPath };

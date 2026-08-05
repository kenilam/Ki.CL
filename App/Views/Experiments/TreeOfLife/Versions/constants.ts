import { PATH as EXPERIMENTS } from '@/Views/Experiments/constants';

import { PATH } from '@/Views/Experiments/TreeOfLife/constants';

/**
 * The versions kept around, oldest first.
 *
 * Each was a whole attempt at drawing the tree rather than a revision of the
 * last, so they are worth keeping side by side — the interesting part is how
 * differently the same data can read.
 */
const VERSIONS = [
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

export type Version = (typeof VERSIONS)[number];

type ToVersionPathProps = {
  version?: Version;
  nodeId?: string | null;
};

/**
 * A node under one of the earlier versions, or under the live view when no
 * version is given — so one call can offer both.
 *
 * The version is a literal segment, so `/tree-of-life/v3/ott123` cannot be
 * mistaken for a node called `v3`: a static segment outranks `:nodeId` in the
 * router's own ordering, and nothing about the current path changes.
 */
const toVersionPath = ({ version, nodeId }: ToVersionPathProps): string => {
  return `/${[EXPERIMENTS, PATH, version, nodeId].filter(Boolean).join('/')}`;
};

export { VERSIONS, toVersionPath };

import { PATH as EXPERIMENTS } from '@/Views/Experiments/constants';

import { PATH as TREE_OF_LIFE } from '@/Views/Experiments/TreeOfLife/constants';

export const PATH = 'versions';

/**
 * The versions kept around, oldest first.
 *
 * Each was a whole attempt at drawing the tree rather than a revision of the
 * last, so they are worth keeping side by side — the interesting part is how
 * differently the same data can read.
 */
export const VERSIONS = [
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  '11',
  '12',
  '13',
  '14',
  '15',
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
export const toVersionPath = ({
  version,
  nodeId,
}: ToVersionPathProps): string => {
  return `/${[EXPERIMENTS, TREE_OF_LIFE, PATH, version, nodeId].filter(Boolean).join('/')}`;
};

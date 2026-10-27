import { toPath as toNodePath } from '@/views/experiments/tree-of-life/constants';

const PATH = 'details';

/** A taxon with its details open over the tree. */
const toPath = (nodeId?: string | null): string =>
  `${toNodePath(nodeId)}/${PATH}`;

export { PATH, toPath };

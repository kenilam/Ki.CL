import { useMemo, useSyncExternalStore } from 'react';

// Context
import { useSubtreeContext } from '@/views/experiments/tree-of-life/subtree-context';

// Labels
import {
  drawnTaxa,
  drawnVersion,
  subscribeDrawn,
} from '@/views/experiments/tree-of-life/explorer/label-store';

// Constants
import type { Option } from '@/views/experiments/tree-of-life/explorer/panel/search/constants';

/** The taxa drawn right now, which the dropdown offers before anything is typed. */
const useOnScreen = () => {
  const { find } = useSubtreeContext();

  // The version is the snapshot: `drawnTaxa` builds a fresh array each call.
  const version = useSyncExternalStore(
    subscribeDrawn,
    drawnVersion,
    drawnVersion
  );

  return useMemo(
    (): Option[] =>
      drawnTaxa()
        .map((nodeId) => {
          const taxon = find(nodeId);

          return taxon?.name
            ? { nodeId, name: taxon.name, detail: taxon.rank ?? '' }
            : null;
        })
        .filter((option): option is Option => option !== null)
        .sort((a, b) => a.name.localeCompare(b.name)),
    // `find` reads the cache, and `version` is what says the cache moved.
    [version, find]
  );
};

export { useOnScreen };

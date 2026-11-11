import { useEffect, useState } from 'react';

// API
import {
  useApolloClient,
  useQuery,
  useSubscription,
  skipToken,
  Kicl_NotificationsDocument,
  Kicl_TaxonVisualDocument,
  Kicl_TaxonVisualUpdatedDocument,
  type Kicl_TaxonVisualQueryVariables,
} from 'api/provider';

// Tree
import {
  displayRank,
  type TreeNode,
} from '@/views/experiments/tree-of-life/tree';

// Constants
import { DEBOUNCE_MS } from './constants';

type Props = {
  eligible: boolean;
  name: string;
  node: TreeNode | null;
};

/** Asks for the plate once the taxon has stayed put, and follows it while it is drawn. */
const useRequest = ({ eligible, name, node }: Props) => {
  const rank = displayRank(node?.rank) || null;
  const ottId = node?.ottId ?? null;

  const [debounced, setDebounced] =
    useState<Kicl_TaxonVisualQueryVariables | null>(null);

  useEffect(() => {
    if (!eligible || ottId == null || !name) {
      setDebounced(null);

      return undefined;
    }

    const handle = window.setTimeout(() => {
      setDebounced({ ottId, name, rank });
    }, DEBOUNCE_MS);

    return () => {
      window.clearTimeout(handle);
    };
  }, [eligible, ottId, name, rank]);

  const client = useApolloClient();
  const { data, loading, error } = useQuery(
    Kicl_TaxonVisualDocument,
    debounced
      ? {
          variables: {
            ottId: debounced.ottId,
            name: debounced.name,
            rank: debounced.rank,
          },
          fetchPolicy: 'network-only',
        }
      : skipToken
  );

  const queryVisual = data?.taxonVisual;
  const awaitingGeneration =
    Boolean(debounced) &&
    !error &&
    (!queryVisual || queryVisual.status === 'PENDING');

  const { data: subscriptionData } = useSubscription(
    Kicl_TaxonVisualUpdatedDocument,
    {
      variables: { ottId: debounced?.ottId ?? 0 },
      skip: !(awaitingGeneration && debounced),
    }
  );

  const drawing = queryVisual?.status === 'PENDING';

  useEffect(() => {
    if (!drawing) {
      return;
    }

    void client.refetchQueries({ include: [Kicl_NotificationsDocument] });
  }, [client, drawing]);

  return {
    awaitingGeneration,
    debounced,
    error,
    loading,
    visual: subscriptionData?.taxonVisualUpdated ?? queryVisual,
  };
};

export { useRequest };

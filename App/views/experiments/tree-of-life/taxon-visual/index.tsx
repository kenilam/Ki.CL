import React, { useEffect, useState } from 'react';

import {
  useQuery,
  useSubscription,
  useLazyQuery,
  skipToken,
  Kicl_TaxonVisualDocument,
  Kicl_TaxonVisualUpdatedDocument,
  Kicl_TreeOfLifeSubtreeDocument,
} from 'api/provider';

import { Status } from '@/components';

import {
  labelFor,
  displayRank,
  fromSubtreeNode,
  type TreeNode,
} from '@/views/experiments/tree-of-life/tree';

// Partials
import { Plate, announcementFor } from './plate';

// Styles
import './styles.scss';

// Constants
import { ERROR_MESSAGES, messageKey } from './constants';

const DEBOUNCE_MS = 500;

export function isTaxonVisualEligible(
  node: TreeNode,
  isOrigin = false
): boolean {
  if (isOrigin) {
    return false;
  }
  if (node.ottId == null || node.ottId < 1) {
    return false;
  }
  return Boolean(labelFor(node));
}

type Props = {
  node: TreeNode;
  isOrigin?: boolean;
  onSubtree: (subtree: TreeNode) => void;
};

const TaxonVisualPanel: React.FC<Props> = ({
  node,
  isOrigin = false,
  onSubtree,
}) => {
  const eligible = isTaxonVisualEligible(node, isOrigin);
  const name = labelFor(node);
  const rank = displayRank(node.rank) || null;
  const ottId = node.ottId ?? null;

  const [debounced, setDebounced] = useState<{
    ottId: number;
    name: string;
    rank: string | null;
  } | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const [fetchSubtree] = useLazyQuery(Kicl_TreeOfLifeSubtreeDocument, {
    fetchPolicy: 'network-only',
  });

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

  const queryVisual = data?.TaxonVisual;
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

  const visual = subscriptionData?.TaxonVisualUpdated ?? queryVisual;
  const settled =
    visual && visual.status !== 'PENDING'
      ? `${visual.status}:${visual.ottId}:${visual.nodeId ?? ''}`
      : null;

  useEffect(() => {
    if (!settled || !visual) {
      return;
    }

    const nodeId = visual.nodeId ?? node.nodeId;
    const visualOttId = visual.ottId;
    let cancelled = false;

    void (async () => {
      setRefreshing(true);
      try {
        const result = await fetchSubtree({
          variables: visualOttId
            ? { ottId: visualOttId, heightLimit: 1 }
            : { nodeId, heightLimit: 1 },
        });
        const raw = result.data?.TreeOfLifeSubtree;
        if (!cancelled && raw?.nodeId) {
          onSubtree(fromSubtreeNode(raw));
        }
      } finally {
        if (!cancelled) {
          setRefreshing(false);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [fetchSubtree, node.nodeId, onSubtree, settled, visual]);

  if (!eligible) {
    return (
      <Status
        in
        level='info'
        title='Plate'
        headingLevel='h3'
        message='Pick a named taxon and one will be drawn for it.'
        align='start'
        property='fade'
      />
    );
  }

  const imageUrl = node.asset?.url ?? null;
  const status = node.visualStatus ?? visual?.status;
  const failed = Boolean(error) || status === 'ERROR' || status === 'EXHAUSTED';

  const isGenerating =
    !imageUrl &&
    !failed &&
    (!debounced || loading || refreshing || awaitingGeneration || !visual);

  return (
    <>
      {/*
        Mounted in every state, so the change from drawing to a plate or a
        failure is announced. A region that mounts with its text is not.
      */}
      <p className='kicl-hidden' aria-live='polite'>
        {announcementFor({ imageUrl, isGenerating, name })}
      </p>
      <Plate
        failed={failed}
        imageUrl={imageUrl}
        isGenerating={isGenerating}
        message={ERROR_MESSAGES[messageKey({ error: Boolean(error), status })]}
        name={name}
      />
    </>
  );
};

export { TaxonVisualPanel };

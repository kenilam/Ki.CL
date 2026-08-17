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

import { Image, Layout, Skeleton, Status, Text } from '@/Components';

import {
  labelFor,
  displayRank,
  fromSubtreeNode,
  type TreeNode,
} from '@/Views/Experiments/TreeOfLife/tree';

const DEBOUNCE_MS = 500;

const DISCLAIMER =
  'Generated from a description - not a photograph, and not always right.';

/** Exhaustion is the one failure a reload cannot clear, so it says so. */
const ERROR_MESSAGES = {
  unreachable: 'Could not reach the plate. Check your connection and reload.',
  exhausted: 'Out of drawing quota - reloading will not bring it back.',
  unfinished:
    'The drawing did not finish. Reload to send it back for another try.',
};

function messageKey({
  error,
  status,
}: {
  error: boolean;
  status?: string | null;
}): keyof typeof ERROR_MESSAGES {
  if (error) {
    return 'unreachable';
  }

  if (status === 'EXHAUSTED') {
    return 'exhausted';
  }

  return 'unfinished';
}

const CLASS_NAME = 'kicl--views--experiments--tree-of-life--v14';

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

  if (!imageUrl && failed) {
    return (
      <Status
        in
        level='warning'
        title='No plate'
        message={ERROR_MESSAGES[messageKey({ error: Boolean(error), status })]}
        align='start'
        property='fade'
      />
    );
  }

  if (isGenerating) {
    return (
      <Layout gap='narrowest' aria-busy='true' aria-live='polite'>
        <div>
          <Skeleton
            aria-hidden
            className={`${CLASS_NAME}__taxon-plate-skeleton`}
          />
          <Text is='span' className='kicl-font-size-small kicl-color-grey-dark'>
            Drawing this one - it takes about a minute.
          </Text>
        </div>
      </Layout>
    );
  }

  if (!imageUrl) {
    return (
      <Status
        in
        level='warning'
        title='No plate'
        message={ERROR_MESSAGES.unfinished}
        align='start'
        property='fade'
      />
    );
  }

  return (
    <Layout gap='narrowest'>
      <div>
        <Image
          data={imageUrl}
          alt={`Plate of ${name || 'this taxon'}, drawn from a description`}
          className={`${CLASS_NAME}__taxon-plate`}
        />
        <Text
          dense
          is='span'
          lookLike='h6'
          className='kicl-font-size-smaller kicl-color-grey-dark kicl-line-height-narrow'
        >
          {DISCLAIMER}
        </Text>
      </div>
    </Layout>
  );
};

export default TaxonVisualPanel;

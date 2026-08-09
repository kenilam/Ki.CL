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

/*
 * Two ways to be out of quota, and only one of them ends on its own.
 *
 * The server distinguishes them because the difference decides whether telling
 * someone to wait is true: an allowance that refills tomorrow is worth waiting
 * for, an empty balance is not. Saying "try again shortly" for both invited a
 * refresh that could never succeed — the same mistake as retrying a spent
 * account every thirty minutes, made in the copy instead of the code.
 */
const EXHAUSTED_REFILLS = 'Out of drawing quota until tomorrow.';

const EXHAUSTED_BILLING =
  'Out of drawing credit. This one needs paying for, not waiting out.';

const ERROR_MESSAGE = 'The drawing step failed. Reload to try again.';

const DISCLAIMER_DEFAULT = 'Drawn from a description, not photographed.';

const DISCLAIMER_PASS = 'Drawn from a description, not photographed.';

const DISCLAIMER_FAIL =
  'Drawn from a description. The reviewer was not convinced this is the right ' +
  'organism.';

const CLASS_NAME = 'kicl--views--experiments--tree-of-life--v14';

function disclaimerForScore(
  score:
    { overall: number; taxonMatch: number; pass: boolean } | null | undefined
): string {
  if (!score) {
    return DISCLAIMER_DEFAULT;
  }
  if (!score.pass || score.taxonMatch < 6) {
    return DISCLAIMER_FAIL;
  }
  if (score.overall < 8) {
    return DISCLAIMER_DEFAULT;
  }
  return DISCLAIMER_PASS;
}

/** Named OTTs only — origin / unnamed nodes skip generation. */
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
  /** Merge a fresh TreeOfLifeSubtree (studio fields) into the live tree. */
  onSubtree: (subtree: TreeNode) => void;
};

/**
 * Kick TaxonVisual generation; on settle, refetch that node's subtree so the
 * tree query remains the UI source of truth (asset / description / status).
 */
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
      /*
       * `useSubscription` has no `skipToken` equivalent — that is a `useQuery`
       * affordance — so it keeps the `skip` option, which means variables have
       * to satisfy the type even on the skipped pass.
       */
      variables: { ottId: debounced?.ottId ?? 0 },
      skip: !(awaitingGeneration && debounced),
    }
  );

  const visual = subscriptionData?.TaxonVisualUpdated ?? queryVisual;
  const settled =
    visual && visual.status !== 'PENDING'
      ? `${visual.status}:${visual.ottId}:${visual.nodeId ?? ''}`
      : null;

  // After generation settles, refresh the node from TreeOfLifeSubtree.
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
        animationStyle='fade'
      />
    );
  }

  const imageUrl = node.asset?.url ?? null;
  const status = node.visualStatus ?? visual?.status;
  /*
   * Only the generation result carries this — the node record stores the status
   * but not the reason behind it, so a status read from the node leaves this
   * null and the wait-and-see message is what shows.
   */
  const exhaustion = visual?.exhaustion ?? null;
  const failed = Boolean(error) || status === 'ERROR' || status === 'EXHAUSTED';

  const isGenerating =
    !imageUrl &&
    !failed &&
    (!debounced || loading || refreshing || awaitingGeneration || !visual);

  /*
   * Never let a status hide a picture that exists.
   *
   * `status` is whichever of the node record and the generation query answered
   * last, and those two disagree readily: a node can carry an asset from an
   * earlier success while a later attempt reports ERROR, and the subscription
   * can push a failure over a query that had already returned READY. Reporting
   * "could not generate" while holding the generated image is the worst of the
   * possible readings, so the image wins whenever there is one.
   */
  if (!imageUrl && (error || status === 'ERROR' || status === 'EXHAUSTED')) {
    return (
      <Status
        in
        level='warning'
        title='No plate'
        message={
          status === 'EXHAUSTED'
            ? // Absent on an older payload, where waiting was the safe reading.
              exhaustion === 'BILLING'
              ? EXHAUSTED_BILLING
              : EXHAUSTED_REFILLS
            : error
              ? 'The plate would not load.'
              : ERROR_MESSAGE
        }
        align='start'
        animationStyle='fade'
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
            Drawing this one — it takes about a minute.
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
        message={ERROR_MESSAGE}
        align='start'
        animationStyle='fade'
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
          {disclaimerForScore(node.visualScore)}
        </Text>
      </div>
    </Layout>
  );
};

export default TaxonVisualPanel;

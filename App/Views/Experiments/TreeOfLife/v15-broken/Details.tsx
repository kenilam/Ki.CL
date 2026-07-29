import React, { useState } from 'react';

import {
  Badge,
  BadgeLabel,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Details as DetailsDisclosure,
  Layout,
  Text,
} from '@/Components';

import TaxonVisualPanel from '@/Views/Experiments/TreeOfLife/TaxonVisual';
import {
  displayRank,
  isTerminalRank,
  labelFor,
  type TreeNode,
} from '@/Views/Experiments/TreeOfLife/tree';

const CLASS_NAME = 'kicl--views--experiments--tree-of-life--v15';

type Props = {
  node: TreeNode;
  isOrigin: boolean;
  /** Fold freshly-generated studio fields back into the universe entry. */
  onSubtree: (subtree: TreeNode) => void;
};

/**
 * v14's detail panel, reused. Differences per spec: no Close action and no
 * Reset — the panel is route-driven, so there is no pinned selection to
 * clear; it simply always reflects the focused node.
 */
const Details: React.FunctionComponent<Props> = ({
  node,
  isOrigin,
  onSubtree,
}) => {
  const [open, setOpen] = useState(true);

  const rank = displayRank(node.rank);
  const terminal = isTerminalRank(node.rank);
  const hasMeta = Boolean(rank) || terminal || node.ottId != null;

  return (
    <Card
      is='aside'
      aria-live='polite'
      className={`${CLASS_NAME}__panel kicl-inline-size-xxl`}
    >
      {hasMeta ? (
        <CardHeader>
          <Layout
            display='inline-grid'
            gap='narrow'
            autoFlow='column'
            alignItems='center'
            justifyContent='start'
          >
            <div>
              {rank ? (
                <Badge
                  variant='outline'
                  className='kicl-font-size-smaller kicl-text-transform-lowercase'
                >
                  <BadgeLabel>Rank</BadgeLabel>
                  {rank}
                </Badge>
              ) : null}
              {terminal ? (
                <Badge
                  variant='secondary'
                  className='kicl-font-size-smaller kicl-text-transform-lowercase'
                >
                  terminal
                </Badge>
              ) : null}
              {node.ottId != null ? (
                <Badge variant='outline' className='kicl-font-size-smaller'>
                  <BadgeLabel>OTT ID</BadgeLabel>
                  {node.ottId}
                </Badge>
              ) : null}
            </div>
          </Layout>
        </CardHeader>
      ) : null}

      <CardContent>
        <Layout gap='narrow'>
          <div>
            <DetailsDisclosure
              className='kicl-color-grey-dark'
              open={open}
              onToggle={(event) => {
                setOpen(event.currentTarget.open);
              }}
              summary={
                <CardTitle
                  is='h2'
                  className='kicl-font-size kicl-color-grey-darker'
                >
                  {isOrigin
                    ? 'Origin of life'
                    : labelFor(node) || 'Unnamed node'}
                </CardTitle>
              }
            >
              <TaxonVisualPanel
                node={node}
                isOrigin={isOrigin}
                onSubtree={onSubtree}
              />
            </DetailsDisclosure>

            {node.description?.trim() ? (
              <Text
                dense
                is='p'
                className='kicl-font-size-small kicl-color-grey-dark kicl-line-height-narrow'
              >
                {node.description.trim()}
              </Text>
            ) : null}
          </div>
        </Layout>
      </CardContent>
    </Card>
  );
};

export default Details;

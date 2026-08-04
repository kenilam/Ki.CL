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
import { useTreeOfLifeContext } from '@/Views/Experiments/TreeOfLife/Context';
import { ROOT_NODE_ID } from '@/Views/Experiments/TreeOfLife/constants';
import {
  displayRank,
  isTerminalRank,
  labelFor,
  type TreeNode,
} from '@/Views/Experiments/TreeOfLife/tree';

const CLASS_NAME = 'kicl--views--experiments--tree-of-life--v15';

/**
 * The detail panel, reading the focused taxon straight from context.
 *
 * No Close and no Reset: the panel is route-driven, so there is no pinned
 * selection to clear — it always reflects whatever the route is on. It is
 * handed nothing either, because the context already knows which taxon that is
 * and `find` reads it from the same cache everything else does.
 */
const Details: React.FunctionComponent = () => {
  const { find, focus } = useTreeOfLifeContext();
  const taxon = focus ? find(focus) : null;
  const [open, setOpen] = useState(true);

  // Nothing to describe until the lineage has resolved.
  if (!taxon) {
    return null;
  }

  const node = taxon as TreeNode;
  const isOrigin = node.nodeId === ROOT_NODE_ID;
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
              open={open}
              onToggle={(event) => {
                setOpen(event.currentTarget.open);
              }}
              summary={
                <CardTitle is='h2' className='kicl-font-size'>
                  {isOrigin
                    ? 'Origin of life'
                    : labelFor(node) || 'Unnamed node'}
                </CardTitle>
              }
            >
              {/*
                No `onSubtree` fold-back: generated fields land in the Apollo
                cache, which is what `find` reads, so the panel picks them up
                without anything being threaded through it.
              */}
              <TaxonVisualPanel
                node={node}
                isOrigin={isOrigin}
                onSubtree={() => {}}
              />
            </DetailsDisclosure>

            {node.description?.trim() ? (
              <Text
                dense
                is='p'
                className={`kicl-font-size-small kicl-line-height-narrow ${CLASS_NAME}__muted`}
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

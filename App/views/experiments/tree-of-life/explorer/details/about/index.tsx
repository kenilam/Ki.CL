import React from 'react';

// Libraries
import { useTranslation } from 'react-i18next';

import { Badge, BadgeLabel, List, Text } from 'design/components';

import { TaxonVisualPanel } from '@/views/experiments/tree-of-life/taxon-visual';
import { useTreeOfLifeContext } from '@/views/experiments/tree-of-life/context';
import { ROOT_NODE_ID } from '@/views/experiments/tree-of-life/constants';
import {
  displayRank,
  isTerminalRank,
  type TreeNode,
} from '@/views/experiments/tree-of-life/tree';

/** What the focused taxon is: its rank and id, its plate and its description. */
const About: React.FunctionComponent = () => {
  const { t } = useTranslation('tree-of-life');
  const { find, focus } = useTreeOfLifeContext();
  const taxon = focus ? find(focus) : null;

  if (!taxon) {
    return null;
  }

  const node = taxon as TreeNode;
  const rank = displayRank(node.rank);
  const terminal = isTerminalRank(node.rank);
  const hasMeta = Boolean(rank) || terminal || node.ottId != null;

  return (
    <>
      {hasMeta ? (
        <List display='flex' gap='narrow' wrap>
          {rank ? (
            <Badge
              is='li'
              variant='ghost'
              className='kicl-text-transform-lowercase'
            >
              <BadgeLabel>{t('label', { context: 'rank' })}</BadgeLabel>
              {rank}
            </Badge>
          ) : null}
          {terminal ? (
            <Badge
              is='li'
              variant='secondary'
              className='kicl-text-transform-lowercase'
            >
              {t('terminal')}
            </Badge>
          ) : null}
          {node.ottId != null ? (
            <Badge is='li' variant='ghost'>
              <BadgeLabel>{t('label', { context: 'ott_id' })}</BadgeLabel>
              {node.ottId}
            </Badge>
          ) : null}
        </List>
      ) : null}

      {/*
          No `onSubtree`: generated fields land in the Apollo cache, which
          is what `find` reads, so the dialog picks them up on its own.
        */}
      <TaxonVisualPanel node={node} isOrigin={node.nodeId === ROOT_NODE_ID} />

      {node.description?.trim() ? (
        <Text dense is='p' className='kicl-color-grey-700'>
          {node.description.trim()}
        </Text>
      ) : null}
    </>
  );
};

export { About };

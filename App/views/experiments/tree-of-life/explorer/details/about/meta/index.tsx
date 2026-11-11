import React from 'react';

// Components
import { Badge, BadgeLabel, List } from 'design/components';

// Tree
import {
  displayRank,
  isTerminalRank,
} from '@/views/experiments/tree-of-life/tree';

// Hooks
import { useTranslation } from 'design/hooks';
import { useTaxon } from '@/views/experiments/tree-of-life/explorer/details/use-taxon';

/** The taxon's rank, whether it is a terminal taxon, and its Open Tree id. */
const Meta: React.FunctionComponent = () => {
  const { t } = useTranslation('tree-of-life');
  const taxon = useTaxon();

  const rank = displayRank(taxon?.rank);
  const terminal = isTerminalRank(taxon?.rank);
  const hasMeta = Boolean(rank) || terminal || taxon?.ottId != null;

  if (!taxon || !hasMeta) {
    return null;
  }

  return (
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
      {taxon.ottId != null ? (
        <Badge is='li' variant='ghost'>
          <BadgeLabel>{t('label', { context: 'ott_id' })}</BadgeLabel>
          {taxon.ottId}
        </Badge>
      ) : null}
    </List>
  );
};

export { Meta };

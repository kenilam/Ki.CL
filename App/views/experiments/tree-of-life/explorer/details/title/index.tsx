import React from 'react';

// Components
import { Heading } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';
import { useTaxon } from '@/views/experiments/tree-of-life/explorer/details/use-taxon';

// Constants
import { ROOT_NODE_ID } from '@/views/experiments/tree-of-life/constants';

// Tree
import { labelFor } from '@/views/experiments/tree-of-life/tree';

const Title: React.FunctionComponent = () => {
  const { t } = useTranslation('tree-of-life');
  const taxon = useTaxon();

  if (!taxon) {
    return null;
  }

  const title =
    taxon.nodeId === ROOT_NODE_ID
      ? t('origin')
      : labelFor(taxon) || t('unnamed_node');

  return (
    <Heading dense is='h2' lookLike='h4'>
      {title}
    </Heading>
  );
};

export { Title };

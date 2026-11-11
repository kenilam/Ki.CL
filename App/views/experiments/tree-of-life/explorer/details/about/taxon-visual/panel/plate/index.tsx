import React from 'react';

// Components
import { Status } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

// Context
import { useTaxonVisualContext } from '@/views/experiments/tree-of-life/explorer/details/about/taxon-visual/context';

// Constants
import { messageKey } from '@/views/experiments/tree-of-life/explorer/details/about/taxon-visual/constants';

// Partials
import { Drawing } from './drawing';
import { Picture } from './picture';

const Plate: React.FunctionComponent = () => {
  const { t } = useTranslation('tree-of-life');
  const { error, failed, imageUrl, isGenerating, status } =
    useTaxonVisualContext();

  if (imageUrl) {
    return <Picture />;
  }

  if (!failed && isGenerating) {
    return <Drawing />;
  }

  const context = failed ? messageKey({ error, status }) : 'unfinished';

  return (
    <Status
      in
      level='warning'
      title={t('title', { context: 'no_plate' })}
      headingLevel='h3'
      message={t('error', { context })}
      justifyContent='start'
      property='fade'
    />
  );
};

export { Plate };

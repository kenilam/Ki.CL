import React from 'react';

// Components
import { Text } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

// Context
import { useTaxonVisualContext } from '@/views/experiments/tree-of-life/explorer/details/about/taxon-visual/context';

// Constants
import { announcementFor } from '@/views/experiments/tree-of-life/explorer/details/about/taxon-visual/constants';

/**
 * Mounted in every state, so the change from drawing to a plate or a failure
 * is announced. A region that mounts with its text is not.
 */
const Announcement: React.FunctionComponent = () => {
  const { t } = useTranslation('tree-of-life');
  const { imageUrl, isGenerating, name } = useTaxonVisualContext();

  return (
    <Text is='p' className='kicl-hidden' aria-live='polite'>
      {t('plate', {
        context: announcementFor({ imageUrl, isGenerating }),
        name: name || t('this_taxon'),
      })}
    </Text>
  );
};

export { Announcement };

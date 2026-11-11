import React from 'react';

// Components
import { Text } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

// Context
import { useSearchContext } from '@/views/experiments/tree-of-life/explorer/panel/search/context';

// Constants
import { statusKey } from '@/views/experiments/tree-of-life/explorer/panel/search/constants';

const Status: React.FunctionComponent = () => {
  const { t } = useTranslation('tree-of-life');
  const { found, loading, options, searching } = useSearchContext();

  return (
    <Text dense is='p' aria-live='polite' className='kicl-color-grey-700'>
      {t('status', {
        context: statusKey({
          loading,
          searching,
          matches: found.length,
        }),
        count: options.length,
      })}
    </Text>
  );
};

export { Status };

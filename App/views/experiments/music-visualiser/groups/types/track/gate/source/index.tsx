import React from 'react';

// Libraries
import classNames from 'classnames';

// Components
import { Text } from 'design/components';

// Catalog
import { useNames } from '@/views/experiments/music-visualiser/use-names';

// Hooks
import { useTranslation } from 'design/hooks';

// Context
import { useTrackContext } from '@/views/experiments/music-visualiser/groups/types/track/context';

const Source: React.FunctionComponent = () => {
  const { track } = useTrackContext();
  const { t } = useTranslation('music-visualiser');
  const { category } = useNames(track);

  return (
    <Text
      is='p'
      dense
      variant='secondary'
      className={classNames(
        'kicl-font-size-medium',
        'kicl-margin-block-start-wide'
      )}
    >
      {t('source', { category })}
    </Text>
  );
};

export { Source };

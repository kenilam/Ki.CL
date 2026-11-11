import React from 'react';

// Components
import { Heading, ListItem, Text } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

// Constants
import type { WAYS } from '@/views/experiments/kinetic-light/home/article/reading/ways/constants';

type Props = { context: (typeof WAYS)[number] };

const Way: React.FunctionComponent<Props> = ({ context }) => {
  const { t } = useTranslation('kinetic-light');

  return (
    <ListItem autoFlow='row' gap='none'>
      <Heading dense is='h4'>
        {t('article.reading.way', { context })}
      </Heading>
      <Text is='p'>{t('article.reading.how', { context })}</Text>
    </ListItem>
  );
};

export { Way };

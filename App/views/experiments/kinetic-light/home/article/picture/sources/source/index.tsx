import React from 'react';

// Components
import { Heading, ListItem, Text } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

// Constants
import type { SOURCES } from '@/views/experiments/kinetic-light/home/article/picture/sources/constants';

type Props = { context: (typeof SOURCES)[number] };

const Source: React.FunctionComponent<Props> = ({ context }) => {
  const { t } = useTranslation('kinetic-light');

  return (
    <ListItem autoFlow='row' gap='none'>
      <Heading dense is='h4'>
        {t('kind', { context })}
      </Heading>
      <Text is='p'>{t('article.picture.from', { context })}</Text>
    </ListItem>
  );
};

export { Source };

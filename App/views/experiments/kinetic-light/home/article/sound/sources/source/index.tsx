import React from 'react';

// Components
import { Heading, ListItem, Text } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

// Constants
import type { SOURCES } from '@/views/experiments/kinetic-light/home/article/sound/sources/constants';

type Props = { context: (typeof SOURCES)[number] };

const Source: React.FunctionComponent<Props> = ({ context }) => {
  const { t } = useTranslation('kinetic-light');

  return (
    <ListItem autoFlow='row' gap='none'>
      <Heading dense is='h4'>
        {t('article.sound.when', { context })}
      </Heading>
      <Text is='p'>{t('article.sound.drums', { context })}</Text>
    </ListItem>
  );
};

export { Source };

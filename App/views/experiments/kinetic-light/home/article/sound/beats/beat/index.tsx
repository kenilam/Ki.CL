import React from 'react';

// Components
import { Heading, ListItem, Text } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

// Constants
import type { BEATS } from '@/views/experiments/kinetic-light/constants';

type Props = { context: (typeof BEATS)[number] };

const Beat: React.FunctionComponent<Props> = ({ context }) => {
  const { t } = useTranslation('kinetic-light');

  return (
    <ListItem autoFlow='row' gap='none'>
      <Heading dense is='h4'>
        {t('beat', { context })}
      </Heading>
      <Text is='p'>{t('article.sound.drum', { context })}</Text>
    </ListItem>
  );
};

export { Beat };

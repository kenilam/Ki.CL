import React from 'react';

// Components
import { Heading, ListItem, Markdown, Text } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

// Constants
import type { VOICES } from '@/views/experiments/kinetic-light/constants';

type Props = { context: (typeof VOICES)[number] };

const Voice: React.FunctionComponent<Props> = ({ context }) => {
  const { t } = useTranslation('kinetic-light');

  return (
    <ListItem autoFlow='row' gap='none'>
      <Heading dense is='h4'>
        {t('voice', { context })}
      </Heading>
      <Text is='p'>
        <Markdown>{t('article.sound.voice', { context })}</Markdown>
      </Text>
    </ListItem>
  );
};

export { Voice };

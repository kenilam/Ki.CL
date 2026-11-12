import React from 'react';

// Components
import { Details, Markdown, Text } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

/** The address is the player: `/play`, pause and skip as links. */
const Address: React.FunctionComponent = () => {
  const { t } = useTranslation('music-visualiser');

  return (
    <Details heading='h3' summary={t('title', { context: 'address' })}>
      <Text is='p'>
        <Markdown>{t('article.address.play')}</Markdown>
      </Text>
      <Text is='p'>
        <Markdown>{t('article.address.gesture')}</Markdown>
      </Text>
      <Text is='p'>{t('article.address.crossfade')}</Text>
    </Details>
  );
};

export { Address };

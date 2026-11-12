import React from 'react';

// Components
import { Details, Markdown, Text } from 'design/components';

// Catalog
import {
  ATTRIBUTION,
  TOTAL,
} from '@/views/experiments/music-visualiser/catalog';

// Hooks
import { useTranslation } from 'design/hooks';

/** The music: where the tracks come from, and why they are hosted here. */
const Music: React.FunctionComponent = () => {
  const { t } = useTranslation('music-visualiser');

  return (
    <Details heading='h3' summary={t('title', { context: 'music' })}>
      <Text is='p'>
        <Markdown>
          {t('article.music.source', {
            tracks: TOTAL,
            url: ATTRIBUTION.url,
          })}
        </Markdown>
      </Text>
      <Text is='p'>{t('article.music.hosting')}</Text>
      <Text is='p'>{t('article.music.others')}</Text>
      <Text is='p'>{t('article.music.generated')}</Text>
    </Details>
  );
};

export { Music };

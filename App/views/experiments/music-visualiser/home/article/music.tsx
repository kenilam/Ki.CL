import React from 'react';

// Components
import { Details, Heading, Markdown, Text } from 'design/components';

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
    <Details
      className='kicl-max-inline-size-columns-8'
      gap='narrow'
      summary={
        <Heading dense is='h3' lookLike='h1'>
          {t('title', { context: 'music' })}
        </Heading>
      }
    >
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

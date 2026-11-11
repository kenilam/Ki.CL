import React from 'react';

// Components
import { Details, Heading, Text } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

// Constants
import { SPECTRUM_BANDS } from '@/views/experiments/music-visualiser/features';
import { SCENES } from '@/views/experiments/music-visualiser/spec';

/** The picture: the shader, its scenes, and what it reads from the audio. */
const Picture: React.FunctionComponent = () => {
  const { t } = useTranslation('music-visualiser');

  return (
    <Details
      className='kicl-max-inline-size-columns-8'
      gap='narrow'
      summary={
        <Heading dense is='h3' lookLike='h1'>
          {t('title', { context: 'picture' })}
        </Heading>
      }
    >
      <Text is='p'>
        {t('article.picture.scenes', { scenes: SCENES.length })}
      </Text>
      <Text is='p'>
        {t('article.picture.analyser', { bands: SPECTRUM_BANDS })}
      </Text>
      <Text is='p'>{t('article.picture.dwell')}</Text>
      <Text is='p'>{t('article.picture.random')}</Text>
      <Text is='p'>{t('article.picture.colours')}</Text>
    </Details>
  );
};

export { Picture };

import React from 'react';

// Libraries
import { useTranslation } from 'react-i18next';

// Components
import { Details, Heading, Markdown, Text } from 'design/components';

/** The address is the player: `/play`, pause and skip as links. */
const Address: React.FunctionComponent = () => {
  const { t } = useTranslation('music-visualiser');

  return (
    <Details
      className='kicl-max-inline-size-columns-8'
      gap='narrow'
      summary={
        <Heading dense is='h3' lookLike='h1'>
          {t('title', { context: 'address' })}
        </Heading>
      }
    >
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

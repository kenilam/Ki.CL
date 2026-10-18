import React from 'react';

// Libraries
import { useTranslation } from 'react-i18next';

// Components
import { Details, Heading, Markdown, Text } from 'design/components';

/** Where the data comes from: a catalogue compiled into the page. */
const Data: React.FunctionComponent = () => {
  const { t } = useTranslation('music-visualiser');

  return (
    <Details
      gap='narrow'
      summary={
        <Heading dense is='h3' lookLike='h1'>
          {t('title', { context: 'data' })}
        </Heading>
      }
    >
      <Text is='p'>
        <Markdown>{t('article.data.route')}</Markdown>
      </Text>
      <Text is='p'>{t('article.data.graphql')}</Text>
    </Details>
  );
};

export { Data };

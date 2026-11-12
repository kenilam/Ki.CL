import React from 'react';

// Components
import { Details, Markdown, Text } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

/** Where the data comes from: a catalogue compiled into the page. */
const Data: React.FunctionComponent = () => {
  const { t } = useTranslation('music-visualiser');

  return (
    <Details heading='h3' summary={t('title', { context: 'data' })}>
      <Text is='p'>
        <Markdown>{t('article.data.route')}</Markdown>
      </Text>
      <Text is='p'>{t('article.data.graphql')}</Text>
    </Details>
  );
};

export { Data };

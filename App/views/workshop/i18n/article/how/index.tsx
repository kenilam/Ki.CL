import React from 'react';

// Components
import { Details, Heading, Markdown, Text } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

// Partials
import { Overview } from './overview';
import { Parts } from './parts';

const How: React.FunctionComponent = () => {
  const { t } = useTranslation('internationalisation');

  return (
    <Details
      className='kicl-max-inline-size-columns-8'
      gap='narrow'
      summary={
        <Heading dense is='h2' lookLike='h1'>
          {t('article.how.title')}
        </Heading>
      }
    >
      <Text is='p'>
        <Markdown>{t('article.how.browser')}</Markdown>
      </Text>
      <Text is='p'>
        <Markdown>{t('article.how.select')}</Markdown>
      </Text>
      <Text is='p'>{t('article.how.parts')}</Text>
      <Parts />
      <Overview />
      <Text is='p'>{t('article.how.startup')}</Text>
      <Text is='p'>{t('article.how.source')}</Text>
    </Details>
  );
};

export { How };

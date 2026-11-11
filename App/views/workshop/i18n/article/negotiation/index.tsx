import React from 'react';

// Components
import { Details, Heading, Markdown, Text } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

// Partials
import { Matches } from './matches';
import { Examples } from './examples';

const Negotiation: React.FunctionComponent = () => {
  const { t } = useTranslation('internationalisation');

  return (
    <Details
      className='kicl-max-inline-size-columns-8'
      gap='narrow'
      summary={
        <Heading dense is='h2' lookLike='h1'>
          {t('article.negotiation.title')}
        </Heading>
      }
    >
      <Text is='p'>
        <Markdown>{t('article.negotiation.header_intro')}</Markdown>
      </Text>
      <Text is='p'>
        <Markdown>{t('article.negotiation.header')}</Markdown>
      </Text>
      <Text is='p'>
        <Markdown>{t('article.negotiation.entries')}</Markdown>
      </Text>
      <Text is='p'>
        <Markdown>{t('article.negotiation.list')}</Markdown>
      </Text>
      <Text is='p'>
        <Markdown>{t('article.negotiation.matching')}</Markdown>
      </Text>
      <Matches />
      <Text is='p'>
        <Markdown>{t('article.negotiation.complete')}</Markdown>
      </Text>
      <Examples />
      <Text is='p'>
        <Markdown>{t('article.negotiation.note')}</Markdown>
      </Text>
    </Details>
  );
};

export { Negotiation };

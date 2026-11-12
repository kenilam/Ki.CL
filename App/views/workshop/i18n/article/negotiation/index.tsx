import React from 'react';

// Components
import { Details, Markdown, Text } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

// Partials
import { Matches } from './matches';
import { Examples } from './examples';

const Negotiation: React.FunctionComponent = () => {
  const { t } = useTranslation('internationalisation');

  return (
    <Details heading='h2' summary={t('article.negotiation.title')}>
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

import React, { useMemo } from 'react';

// Libraries
import { useTranslation } from 'react-i18next';

// Components
import { Details, Diagram, Heading, Markdown, Text } from 'design/components';

// Diagrams
import { context } from './diagrams/context';

/** Retrieval: what the models are given, and the one lookup that retrieves. */
const Retrieval: React.FunctionComponent = () => {
  const { t } = useTranslation('image-agent');
  const spec = useMemo(() => context(t), [t]);

  return (
    <Details
      gap='narrow'
      summary={
        <Heading dense is='h3' lookLike='h1'>
          {t('article.retrieval.title')}
        </Heading>
      }
    >
      <Text is='p'>{t('article.retrieval.assumed')}</Text>
      <Diagram spec={spec} />
      <Heading is='h4' lookLike='h2'>
        {t('article.retrieval.title', { context: 'conversation' })}
      </Heading>
      <Text is='p'>
        <Markdown>{t('article.retrieval.plain_text')}</Markdown>
      </Text>
      <Text is='p'>{t('article.retrieval.brief')}</Text>
      <Heading is='h4' lookLike='h2'>
        {t('article.retrieval.title', { context: 'similar' })}
      </Heading>
      <Text is='p'>{t('article.retrieval.similar')}</Text>
      <Text is='p'>{t('article.retrieval.cheap')}</Text>
      <Text is='p'>{t('article.retrieval.vector_store')}</Text>
    </Details>
  );
};

export { Retrieval };

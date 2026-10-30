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
      <Text className='kicl-max-inline-size-columns-8' is='p'>
        {t('article.retrieval.assumed')}
      </Text>
      <Text className='kicl-max-inline-size-columns-8' is='p'>
        {t('article.retrieval.source')}
      </Text>
      <Diagram spec={spec} />
      <Text className='kicl-max-inline-size-columns-8' is='p'>
        <Markdown>{t('article.retrieval.plain_text')}</Markdown>
      </Text>
      <Text className='kicl-max-inline-size-columns-8' is='p'>
        {t('article.retrieval.brief')}
      </Text>
      <Text className='kicl-max-inline-size-columns-8' is='p'>
        {t('article.retrieval.rewind')}
      </Text>
      <Heading is='h4' lookLike='h2'>
        {t('article.retrieval.title', { context: 'similar' })}
      </Heading>
      <Text className='kicl-max-inline-size-columns-8' is='p'>
        {t('article.retrieval.similar')}
      </Text>
      <Text className='kicl-max-inline-size-columns-8' is='p'>
        {t('article.retrieval.cheap')}
      </Text>
      <Text className='kicl-max-inline-size-columns-8' is='p'>
        {t('article.retrieval.moved')}
      </Text>
      <Text className='kicl-max-inline-size-columns-8' is='p'>
        {t('article.retrieval.vector_store')}
      </Text>
    </Details>
  );
};

export { Retrieval };

import React, { useMemo } from 'react';

// Components
import { Details, Diagram, Heading, Markdown, Text } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

// Partials
import { Ways } from './ways';

// Diagrams
import { reading } from './diagrams/reading';

const Reading: React.FunctionComponent = () => {
  const { t } = useTranslation('kinetic-light');
  const spec = useMemo(() => reading(t), [t]);

  return (
    <Details
      className='kicl-max-inline-size-columns-8'
      gap='narrow'
      summary={
        <Heading dense is='h3' lookLike='h1'>
          {t('article.reading.title')}
        </Heading>
      }
    >
      <Text is='p'>{t('article.reading.intro')}</Text>
      <Ways />
      <Text is='p'>{t('article.reading.steps')}</Text>
      <Text is='p'>
        <Markdown>{t('article.reading.readers')}</Markdown>
      </Text>
      <Text is='p'>{t('article.reading.bars')}</Text>
      <Text is='p'>{t('article.reading.done')}</Text>
      <Diagram spec={spec} />
      <Text is='p'>{t('article.reading.chords')}</Text>
      <Text is='p'>{t('article.reading.repair')}</Text>
      <Text is='p'>{t('article.reading.background')}</Text>
    </Details>
  );
};

export { Reading };

import React, { useMemo } from 'react';

// Components
import { Details, Diagram, Markdown, Text } from 'design/components';

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
    <Details heading='h3' summary={t('article.reading.title')}>
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

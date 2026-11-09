import React, { useMemo } from 'react';

// Libraries
import { useTranslation } from 'react-i18next';

// Components
import {
  Details,
  Diagram,
  Heading,
  List,
  ListItem,
  Markdown,
  Text,
} from 'design/components';

// Diagrams
import { reading } from './diagrams/reading';

const WAYS = ['files', 'sheet'] as const;

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
      <List gap='narrow' listStyleType='disc'>
        {WAYS.map((context) => (
          <ListItem autoFlow='row' gap='none' key={context}>
            <Heading dense is='h4'>
              {t('article.reading.way', { context })}
            </Heading>
            <Text is='p'>{t('article.reading.how', { context })}</Text>
          </ListItem>
        ))}
      </List>
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

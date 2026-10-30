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
  Text,
} from 'design/components';

// Diagrams
import { drawing } from './diagrams/drawing';

const STEPS = ['write', 'generate', 'review', 'rewrite', 'again'] as const;

/** Drawing: the fixed loop, the reviewer, and where pictures are kept. */
const Drawing: React.FunctionComponent = () => {
  const { t } = useTranslation('image-agent');
  const spec = useMemo(() => drawing(t), [t]);

  return (
    <Details
      className='kicl-max-inline-size-columns-8'
      gap='narrow'
      summary={
        <Heading dense is='h3' lookLike='h1'>
          {t('article.drawing.title')}
        </Heading>
      }
    >
      <Text is='p'>{t('article.drawing.order')}</Text>
      <Text is='p'>{t('article.drawing.into_code')}</Text>
      <List gap='narrower' is='ol' listStyleType='decimal'>
        {STEPS.map((context) => (
          <ListItem key={context}>
            <Text is='span'>{t('article.drawing.step', { context })}</Text>
          </ListItem>
        ))}
      </List>
      <Text is='p'>{t('article.drawing.once')}</Text>
      <Diagram spec={spec} />
      <Heading is='h4' lookLike='h2'>
        {t('article.drawing.title', { context: 'prompt' })}
      </Heading>
      <Text is='p'>{t('article.drawing.prompt')}</Text>
      <Text is='p'>{t('article.drawing.positive')}</Text>
      <Heading is='h4' lookLike='h2'>
        {t('article.drawing.title', { context: 'review' })}
      </Heading>
      <Text is='p'>{t('article.drawing.review')}</Text>
      <Text is='p'>{t('article.drawing.pass')}</Text>
      <Text is='p'>{t('article.drawing.first_reviewer')}</Text>
      <Text is='p'>{t('article.drawing.no_reviewer')}</Text>
      <Heading is='h4' lookLike='h2'>
        {t('article.drawing.title', { context: 'storage' })}
      </Heading>
      <Text is='p'>{t('article.drawing.storage')}</Text>
      <Text is='p'>{t('article.drawing.cache')}</Text>
    </Details>
  );
};

export { Drawing };

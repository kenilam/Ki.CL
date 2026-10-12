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
import { governing } from './diagrams/governing';

const RULES = ['words', 'injection', 'links', 'short', 'mashing'] as const;

/** Governing: the four checks, their order, and how each one fails. */
const Governing: React.FunctionComponent = () => {
  const { t } = useTranslation('image-agent');
  const spec = useMemo(() => governing(t), [t]);

  return (
    <Details
      gap='narrow'
      summary={
        <Heading className='kicl-font-size-large' dense is='h3'>
          {t('article.governing.title')}
        </Heading>
      }
    >
      <Text is='p'>
        <Markdown>{t('article.governing.checks')}</Markdown>
      </Text>
      <Diagram spec={spec} />
      <Text is='p'>{t('article.governing.outcomes')}</Text>
      <Heading is='h4' className='kicl-font-size-medium'>
        {t('article.governing.title', { context: 'rules' })}
      </Heading>
      <Text is='p'>{t('article.governing.rules_intro')}</Text>
      <List gap='narrower'>
        {RULES.map((context) => (
          <ListItem key={context}>
            <Text is='span'>{t('article.governing.rule', { context })}</Text>
          </ListItem>
        ))}
      </List>
      <Text is='p'>{t('article.governing.left_off')}</Text>
      <Heading is='h4' className='kicl-font-size-medium'>
        {t('article.governing.title', { context: 'moderation' })}
      </Heading>
      <Text is='p'>{t('article.governing.moderation')}</Text>
      <Text is='p'>
        <Markdown>{t('article.governing.markers')}</Markdown>
      </Text>
      <Heading is='h4' className='kicl-font-size-medium'>
        {t('article.governing.title', { context: 'failed_check' })}
      </Heading>
      <Text is='p'>{t('article.governing.failed_check')}</Text>
      <Heading is='h4' className='kicl-font-size-medium'>
        {t('article.governing.title', { context: 'refusals' })}
      </Heading>
      <Text is='p'>{t('article.governing.refusals')}</Text>
    </Details>
  );
};

export { Governing };

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

const CHECKS = ['limits', 'rules', 'moderation', 'classifier'] as const;

/** Governing: the four checks, their order, and how each one fails. */
const Governing: React.FunctionComponent = () => {
  const { t } = useTranslation('image-agent');
  const spec = useMemo(() => governing(t), [t]);

  return (
    <Details
      gap='narrow'
      summary={
        <Heading dense is='h3' lookLike='h1'>
          {t('article.governing.title')}
        </Heading>
      }
    >
      <Text is='p'>{t('article.governing.checks')}</Text>
      <List gap='narrower' is='ol'>
        {CHECKS.map((context) => (
          <ListItem key={context}>
            <Text is='span'>
              <Markdown>{t('article.governing.check', { context })}</Markdown>
            </Text>
          </ListItem>
        ))}
      </List>
      <Text is='p'>{t('article.governing.clarifier')}</Text>
      <Diagram spec={spec} />
      <Text is='p'>{t('article.governing.outcomes')}</Text>
      <Text is='p'>{t('article.governing.questions')}</Text>
      <Heading is='h4' lookLike='h2'>
        {t('article.governing.title', { context: 'rules' })}
      </Heading>
      <Text is='p'>{t('article.governing.rules_intro')}</Text>
      <Text is='p'>{t('article.governing.rules')}</Text>
      <Text is='p'>{t('article.governing.left_off')}</Text>
      <Heading is='h4' lookLike='h2'>
        {t('article.governing.title', { context: 'moderation' })}
      </Heading>
      <Text is='p'>{t('article.governing.moderation')}</Text>
      <Text is='p'>{t('article.governing.classifier')}</Text>
      <Text is='p'>
        <Markdown>{t('article.governing.markers')}</Markdown>
      </Text>
      <Text is='p'>{t('article.governing.earlier_turns')}</Text>
      <Heading is='h4' lookLike='h2'>
        {t('article.governing.title', { context: 'failed_check' })}
      </Heading>
      <Text is='p'>{t('article.governing.failed_intro')}</Text>
      <Text is='p'>{t('article.governing.failed_check')}</Text>
      <Text is='p'>{t('article.governing.refusals')}</Text>
    </Details>
  );
};

export { Governing };

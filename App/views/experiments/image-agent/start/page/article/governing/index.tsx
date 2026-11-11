import React, { useMemo } from 'react';

// Components
import { Details, Diagram, Heading, Markdown, Text } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

// Partials
import { Checks } from './checks';

// Diagrams
import { governing } from './diagrams/governing';

/** Governing: the four checks, their order, and how each one fails. */
const Governing: React.FunctionComponent = () => {
  const { t } = useTranslation('image-agent');
  const spec = useMemo(() => governing(t), [t]);

  return (
    <Details
      className='kicl-max-inline-size-columns-8'
      gap='narrow'
      summary={
        <Heading dense is='h3' lookLike='h1'>
          {t('article.governing.title')}
        </Heading>
      }
    >
      <Text is='p'>{t('article.governing.checks')}</Text>
      <Checks />
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

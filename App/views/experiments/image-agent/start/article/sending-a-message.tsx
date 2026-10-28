import React, { useMemo } from 'react';

// Libraries
import { useTranslation } from 'react-i18next';

// Components
import {
  Details,
  Diagram,
  DiagramLegend,
  Heading,
  Markdown,
  Text,
  type DiagramLegendItem,
} from 'design/components';

// Diagrams
import { overview } from './diagrams/overview';
import { turn } from './diagrams/turn';

/**
 * Sending a message: the mutation, the subscription, the statuses, and
 * recovery.
 */
const SendingAMessage: React.FunctionComponent = () => {
  const { t } = useTranslation('image-agent');
  const specs = useMemo(() => ({ overview: overview(t), turn: turn(t) }), [t]);

  /** How long a turn may go quiet in each status before it is marked failed. */
  const quiet: DiagramLegendItem[] = [
    {
      label: 'THINKING',
      level: 'warning',
      value: t('article.sending.quiet', { context: 'thinking' }),
    },
    {
      label: 'DRAWING',
      level: 'info',
      value: t('article.sending.quiet', { context: 'drawing' }),
    },
  ];

  return (
    <Details
      gap='narrow'
      summary={
        <Heading dense is='h3' lookLike='h1'>
          {t('article.sending.title')}
        </Heading>
      }
    >
      <Text is='p'>
        <Markdown>{t('article.sending.mutation')}</Markdown>
      </Text>
      <Text is='p'>
        <Markdown>{t('article.sending.subscription')}</Markdown>
      </Text>
      <Diagram spec={specs.overview} />
      <Diagram spec={specs.turn} />
      <Heading is='h4' lookLike='h2'>
        {t('article.sending.title', { context: 'separate' })}
      </Heading>
      <Text is='p'>{t('article.sending.one_turn')}</Text>
      <Text is='p'>
        <Markdown>{t('article.sending.same_write')}</Markdown>
      </Text>
      <Text is='p'>
        <Markdown>{t('article.sending.idle')}</Markdown>
      </Text>
      <Text is='p'>{t('article.sending.streams')}</Text>
      <Heading is='h4' lookLike='h2'>
        {t('article.sending.title', { context: 'pub_sub' })}
      </Heading>
      <Text is='p'>{t('article.sending.pub_sub')}</Text>
      <Text is='p'>{t('article.sending.broker')}</Text>
      <Heading is='h4' lookLike='h2'>
        {t('article.sending.title', { context: 'recovering' })}
      </Heading>
      <Text is='p'>
        <Markdown>{t('article.sending.restart')}</Markdown>
      </Text>
      <Text is='p'>{t('article.sending.handle')}</Text>
      <DiagramLegend items={quiet} />
      <Text is='p'>{t('article.sending.marks_failed')}</Text>
      <Text is='p'>{t('article.sending.not_at_startup')}</Text>
    </Details>
  );
};

export { SendingAMessage };

import React, { useMemo } from 'react';

// Components
import { Details, Diagram, Heading, Markdown, Text } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

// Partials
import { PubSub } from './pub-sub';
import { Recovering } from './recovering';
import { Separate } from './separate';

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

  return (
    <Details
      className='kicl-max-inline-size-columns-8'
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
      <Separate />
      <PubSub />
      <Recovering />
    </Details>
  );
};

export { SendingAMessage };

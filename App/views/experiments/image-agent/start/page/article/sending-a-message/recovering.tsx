import React from 'react';

// Components
import {
  DiagramLegend,
  Heading,
  Markdown,
  Text,
  type DiagramLegendItem,
} from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

const Recovering: React.FunctionComponent = () => {
  const { t } = useTranslation('image-agent');

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
    <>
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
    </>
  );
};

export { Recovering };

import React, { useMemo } from 'react';

// Components
import { Details, Diagram, Heading, Markdown, Text } from 'design/components';

// Diagrams
import { allowance } from './diagrams/allowance';
import { howItWorks } from './diagrams/how-it-works';

// Hooks
import { useTranslation } from 'design/hooks';

/** Rate limiting: the limits, who a person is, and what gets counted. */
const Limits: React.FunctionComponent = () => {
  const { t } = useTranslation('image-agent');
  const specs = useMemo(
    () => ({ allowance: allowance(t), howItWorks: howItWorks(t) }),
    [t]
  );

  return (
    <Details heading='h3' summary={t('article.limits.title')}>
      <Text is='p'>{t('article.limits.cost')}</Text>
      <Text is='p'>{t('article.limits.day')}</Text>
      <Diagram spec={specs.allowance} />
      <Text is='p'>
        <Markdown>{t('article.limits.checked')}</Markdown>
      </Text>
      <Diagram spec={specs.howItWorks} />
      <Heading is='h4' lookLike='h2'>
        {t('article.limits.title', { context: 'person' })}
      </Heading>
      <Text is='p'>{t('article.limits.session')}</Text>
      <Text is='p'>{t('article.limits.token')}</Text>
      <Text is='p'>{t('article.limits.turnstile')}</Text>
      <Text is='p'>{t('article.limits.network')}</Text>
      <Text is='p'>{t('article.limits.counts')}</Text>
      <Text is='p'>
        <Markdown>{t('article.limits.refused')}</Markdown>
      </Text>
      <Text is='p'>{t('article.limits.shared')}</Text>
    </Details>
  );
};

export { Limits };

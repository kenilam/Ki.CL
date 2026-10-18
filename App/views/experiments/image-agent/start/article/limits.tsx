import React, { useMemo } from 'react';

// Libraries
import { useTranslation } from 'react-i18next';

// Components
import { Details, Diagram, Heading, Markdown, Text } from 'design/components';

// Diagrams
import { allowance } from './diagrams/allowance';
import { howItWorks } from './diagrams/how-it-works';

/** Rate limiting: the limits, who a person is, and what gets counted. */
const Limits: React.FunctionComponent = () => {
  const { t } = useTranslation('image-agent');
  const specs = useMemo(
    () => ({ allowance: allowance(t), howItWorks: howItWorks(t) }),
    [t]
  );

  return (
    <Details
      gap='narrow'
      summary={
        <Heading dense is='h3' lookLike='h1'>
          {t('article.limits.title')}
        </Heading>
      }
    >
      <Text is='p'>{t('article.limits.cost')}</Text>
      <Diagram spec={specs.allowance} />
      <Diagram spec={specs.howItWorks} />
      <Heading is='h4' lookLike='h2'>
        {t('article.limits.title', { context: 'person' })}
      </Heading>
      <Text is='p'>{t('article.limits.session')}</Text>
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

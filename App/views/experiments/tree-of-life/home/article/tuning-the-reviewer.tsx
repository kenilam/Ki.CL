import React from 'react';

// Components
import { Details, Markdown, Text } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

const TuningTheReviewer: React.FunctionComponent = () => {
  const { t } = useTranslation('tree-of-life');

  return (
    <Details
      heading='h3'
      summary={t('title', { context: 'tuning_the_reviewer' })}
    >
      <Text is='p'>
        <Markdown>{t('article.tuning_the_reviewer.p1')}</Markdown>
      </Text>
      <Text is='p'>{t('article.tuning_the_reviewer.p2')}</Text>
      <Text is='p'>
        <Markdown>{t('article.tuning_the_reviewer.p3')}</Markdown>
      </Text>
      <Text is='p'>{t('article.tuning_the_reviewer.p4')}</Text>
    </Details>
  );
};

export { TuningTheReviewer };

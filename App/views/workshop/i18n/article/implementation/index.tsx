import React from 'react';

// Components
import { Details, Markdown, Text } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

const Implementation: React.FunctionComponent = () => {
  const { t } = useTranslation('internationalisation');

  return (
    <Details heading='h2' summary={t('article.implementation.title')}>
      <Text is='p'>
        <Markdown>{t('article.implementation.code')}</Markdown>
      </Text>
    </Details>
  );
};

export { Implementation };

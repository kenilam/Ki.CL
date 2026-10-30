import React from 'react';

// Libraries
import { useTranslation } from 'react-i18next';

// Components
import { Details, Heading, Markdown, Text } from 'design/components';

const Implementation: React.FunctionComponent = () => {
  const { t } = useTranslation('internationalisation');

  return (
    <Details
      gap='narrow'
      summary={
        <Heading dense is='h2' lookLike='h1'>
          {t('article.implementation.title')}
        </Heading>
      }
    >
      <Text is='p'>
        <Markdown>{t('article.implementation.code')}</Markdown>
      </Text>
    </Details>
  );
};

export { Implementation };

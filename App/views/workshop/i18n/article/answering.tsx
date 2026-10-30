import React from 'react';

// Libraries
import { useTranslation } from 'react-i18next';

// Components
import { Heading, Markdown, Text } from 'design/components';

const PARAGRAPHS = ['once', 'backend', 'query', 'header_only'] as const;

const Answering: React.FunctionComponent = () => {
  const { t } = useTranslation('internationalisation');

  return (
    <>
      <Heading is='h3' lookLike='h2'>
        {t('article.answering.title')}
      </Heading>
      {PARAGRAPHS.map((paragraph) => {
        return (
          <Text
            className='kicl-max-inline-size-columns-8'
            is='p'
            key={paragraph}
          >
            <Markdown>{t(`article.answering.${paragraph}`)}</Markdown>
          </Text>
        );
      })}
    </>
  );
};

export { Answering };

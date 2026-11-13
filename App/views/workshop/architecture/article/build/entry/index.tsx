import React from 'react';

// Components
import { CodeBlock, Markdown, Text } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

// Constants
import { SOURCE } from './constants';

const Entry: React.FunctionComponent = () => {
  const { t } = useTranslation('architecture');

  return (
    <>
      <Text is='p'>
        <Markdown>{t('article.build.entry_intro')}</Markdown>
      </Text>
      <CodeBlock language='javascript'>{SOURCE}</CodeBlock>
      <Text is='p'>
        <Markdown>{t('article.build.entry_explain')}</Markdown>
      </Text>
    </>
  );
};

export { Entry };

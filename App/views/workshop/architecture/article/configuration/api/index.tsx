import React from 'react';

// Components
import { CodeBlock, Markdown, Text } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

// Constants
import { SOURCE } from './constants';

const Api: React.FunctionComponent = () => {
  const { t } = useTranslation('architecture');

  return (
    <>
      <Text is='p'>
        <Markdown>{t('article.config.api_intro')}</Markdown>
      </Text>
      <CodeBlock>{SOURCE}</CodeBlock>
      <Text is='p'>
        <Markdown>{t('article.config.remote_note')}</Markdown>
      </Text>
    </>
  );
};

export { Api };

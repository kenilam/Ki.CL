import React from 'react';

// Components
import { CodeBlock, Markdown, Text } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

// Constants
import { SOURCE } from './constants';

const Design: React.FunctionComponent = () => {
  const { t } = useTranslation('architecture');

  return (
    <>
      <Text is='p'>
        <Markdown>{t('article.config.design_intro')}</Markdown>
      </Text>
      <CodeBlock>{SOURCE}</CodeBlock>
    </>
  );
};

export { Design };

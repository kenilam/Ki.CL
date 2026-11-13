import React from 'react';

// Components
import { Markdown, Text } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

// Constants
import type { PARAGRAPHS } from '@/views/workshop/architecture/article/cascade/paragraphs/constants';

type Props = { paragraph: (typeof PARAGRAPHS)[number] };

const Paragraph: React.FunctionComponent<Props> = ({ paragraph }) => {
  const { t } = useTranslation('architecture');

  return (
    <Text is='p'>
      <Markdown>{t(`article.cascade.${paragraph}`)}</Markdown>
    </Text>
  );
};

export { Paragraph };

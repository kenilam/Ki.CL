import React from 'react';

// Components
import { Markdown, Text } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

// Constants
import type { PARAGRAPHS } from '@/views/workshop/i18n/article/availability/paragraphs/constants';

type Props = { paragraph: (typeof PARAGRAPHS)[number] };

const Paragraph: React.FunctionComponent<Props> = ({ paragraph }) => {
  const { t } = useTranslation('internationalisation');

  return (
    <Text is='p'>
      <Markdown>{t(`article.availability.${paragraph}`)}</Markdown>
    </Text>
  );
};

export { Paragraph };

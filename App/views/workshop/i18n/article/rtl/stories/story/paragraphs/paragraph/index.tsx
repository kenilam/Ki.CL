import React from 'react';

// Components
import { Markdown, Text } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

// Constants
import type { STORIES } from '@/views/workshop/i18n/article/rtl/stories/constants';

type Props = { paragraph: (typeof STORIES)[number]['paragraphs'][number] };

const Paragraph: React.FunctionComponent<Props> = ({ paragraph }) => {
  const { t } = useTranslation('internationalisation');

  return (
    <Text is='p'>
      <Markdown>{t(`article.rtl.${paragraph}`)}</Markdown>
    </Text>
  );
};

export { Paragraph };

import React from 'react';

// Components
import { ListItem, Markdown, Text } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

// Constants
import type { CHECKS } from '@/views/experiments/image-agent/start/page/article/governing/checks/constants';

type Props = { context: (typeof CHECKS)[number] };

const Check: React.FunctionComponent<Props> = ({ context }) => {
  const { t } = useTranslation('image-agent');

  return (
    <ListItem>
      <Text is='span'>
        <Markdown>{t('article.governing.check', { context })}</Markdown>
      </Text>
    </ListItem>
  );
};

export { Check };

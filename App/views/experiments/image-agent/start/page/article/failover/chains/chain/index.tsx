import React from 'react';

// Components
import { ListItem, Markdown, Text } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

// Constants
import type { CHAINS } from '@/views/experiments/image-agent/start/page/article/failover/chains/constants';

type Props = { context: (typeof CHAINS)[number] };

const Chain: React.FunctionComponent<Props> = ({ context }) => {
  const { t } = useTranslation('image-agent');

  return (
    <ListItem>
      <Text is='span'>
        <Markdown>{t('article.failover.chain', { context })}</Markdown>
      </Text>
    </ListItem>
  );
};

export { Chain };

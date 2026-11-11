import React from 'react';

// Components
import { ListItem, Text } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

// Constants
import type { TIMEOUTS } from '@/views/experiments/image-agent/start/page/article/failover/timeouts/constants';

type Props = { context: (typeof TIMEOUTS)[number] };

const Timeout: React.FunctionComponent<Props> = ({ context }) => {
  const { t } = useTranslation('image-agent');

  return (
    <ListItem>
      <Text is='span'>{t('article.failover.timeout', { context })}</Text>
    </ListItem>
  );
};

export { Timeout };

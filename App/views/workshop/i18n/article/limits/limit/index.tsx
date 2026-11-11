import React from 'react';

// Components
import { ListItem, Text } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

// Constants
import type { LIMITS } from '@/views/workshop/i18n/article/limits/constants';

type Props = { limit: (typeof LIMITS)[number] };

const Limit: React.FunctionComponent<Props> = ({ limit }) => {
  const { t } = useTranslation('internationalisation');

  return (
    <ListItem>
      <Text is='span'>{t(`article.limits.${limit}`)}</Text>
    </ListItem>
  );
};

export { Limit };

import React from 'react';

// Components
import { ListItem, Markdown, Text } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

// Constants
import type { LIMITS } from '@/views/blog/spatial-css/article/limits/constants';

type Props = { limit: (typeof LIMITS)[number] };

const Limit: React.FunctionComponent<Props> = ({ limit }) => {
  const { t } = useTranslation('spatial-css');

  return (
    <ListItem>
      <Text is='span'>
        <Markdown>{t(`article.limits.${limit}`)}</Markdown>
      </Text>
    </ListItem>
  );
};

export { Limit };

import React from 'react';

// Components
import { ListItem, Markdown, Text } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

// Constants
import type { REASONS } from '@/views/workshop/architecture/article/origin/reasons/constants';

type Props = { reason: (typeof REASONS)[number] };

const Reason: React.FunctionComponent<Props> = ({ reason }) => {
  const { t } = useTranslation('architecture');

  return (
    <ListItem>
      <Text is='span'>
        <Markdown>{t(`article.origin.${reason}`)}</Markdown>
      </Text>
    </ListItem>
  );
};

export { Reason };

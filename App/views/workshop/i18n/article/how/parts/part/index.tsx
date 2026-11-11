import React from 'react';

// Components
import { ListItem, Markdown, Text } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

// Constants
import type { PARTS } from '@/views/workshop/i18n/article/how/parts/constants';

type Props = { part: (typeof PARTS)[number] };

const Part: React.FunctionComponent<Props> = ({ part }) => {
  const { t } = useTranslation('internationalisation');

  return (
    <ListItem>
      <Text is='span'>
        <Markdown>{t(`article.how.${part}`)}</Markdown>
      </Text>
    </ListItem>
  );
};

export { Part };

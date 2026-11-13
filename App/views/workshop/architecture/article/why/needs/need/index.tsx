import React from 'react';

// Components
import { ListItem, Markdown, Text } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

// Constants
import type { NEEDS } from '@/views/workshop/architecture/article/why/needs/constants';

type Props = { need: (typeof NEEDS)[number] };

const Need: React.FunctionComponent<Props> = ({ need }) => {
  const { t } = useTranslation('architecture');

  return (
    <ListItem>
      <Text is='span'>
        <Markdown>{t(`article.why.${need}`)}</Markdown>
      </Text>
    </ListItem>
  );
};

export { Need };

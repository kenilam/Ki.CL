import React from 'react';

// Components
import { ListItem, Markdown, Text } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

// Constants
import type { STEPS } from '@/views/blog/spatial-css/article/trying/steps/constants';

type Props = { step: (typeof STEPS)[number] };

const Step: React.FunctionComponent<Props> = ({ step }) => {
  const { t } = useTranslation('spatial-css');

  return (
    <ListItem>
      <Text is='span'>
        <Markdown>{t(`article.trying.${step}`)}</Markdown>
      </Text>
    </ListItem>
  );
};

export { Step };

import React from 'react';

// Components
import { ListItem, Markdown, Text } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

// Constants
import type { STEPS } from '@/views/workshop/architecture/article/load/steps/constants';

type Props = { step: (typeof STEPS)[number] };

const Step: React.FunctionComponent<Props> = ({ step }) => {
  const { t } = useTranslation('architecture');

  return (
    <ListItem>
      <Text is='span'>
        <Markdown>{t(`article.load.${step}`)}</Markdown>
      </Text>
    </ListItem>
  );
};

export { Step };

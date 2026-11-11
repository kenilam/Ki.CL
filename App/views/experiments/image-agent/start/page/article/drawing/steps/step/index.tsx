import React from 'react';

// Components
import { ListItem, Text } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

// Constants
import type { STEPS } from '@/views/experiments/image-agent/start/page/article/drawing/steps/constants';

type Props = { context: (typeof STEPS)[number] };

const Step: React.FunctionComponent<Props> = ({ context }) => {
  const { t } = useTranslation('image-agent');

  return (
    <ListItem>
      <Text is='span'>{t('article.drawing.step', { context })}</Text>
    </ListItem>
  );
};

export { Step };

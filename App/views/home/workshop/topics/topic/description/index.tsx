import React from 'react';

import { CardDescription } from 'design/components';
import { useTranslation } from 'design/hooks';

import { TOPICS } from '@/views/routes';

import type { Props } from '@/views/home/workshop/topics/topic';

const Description: React.FunctionComponent<Props> = ({ to }) => {
  const { t } = useTranslation('workshop');
  const topic = TOPICS.find((each) => {
    return each.to === to;
  });

  if (!topic) {
    return null;
  }

  return (
    <CardDescription>
      {t('description', { context: topic.context })}
    </CardDescription>
  );
};

export { Description };

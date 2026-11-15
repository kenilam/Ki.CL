import React from 'react';

import { Heading } from 'design/components';
import { useResponsive, useTranslation } from 'design/hooks';

import { EXPERIMENTS } from '@/views/routes';

import type { Props } from '@/views/home/hero/works/work';

const LOOKS = {
  true: 'h3',
  false: 'h1',
} as const;

const Name: React.FunctionComponent<Props> = ({ plate }) => {
  const { t } = useTranslation();
  const { isNarrow } = useResponsive();
  const experiment = EXPERIMENTS.find((each) => {
    return each.plate === plate;
  });

  if (!experiment) {
    return null;
  }

  return (
    <Heading
      className='kicl-scroll-focus-reveal'
      is='h3'
      lookLike={LOOKS[String(isNarrow)]}
    >
      {t('experiment', { context: experiment.context })}
    </Heading>
  );
};

export { Name };

import React from 'react';

import { Heading } from 'design/components';
import { useTranslation } from 'design/hooks';

import { EXPERIMENTS } from '@/views/routes';

import type { Props } from '@/views/home/hero/works/work';

import './styles.scss';

import { CLASS_NAME as WORK } from '@/views/home/hero/works/work/constants';

const CLASS_NAME = `${WORK}__name`;

const Name: React.FunctionComponent<Props> = ({ plate }) => {
  const { t } = useTranslation();
  const experiment = EXPERIMENTS.find((each) => {
    return each.plate === plate;
  });

  if (!experiment) {
    return null;
  }

  return (
    <Heading className={CLASS_NAME} is='h3'>
      {t('experiment', { context: experiment.context })}
    </Heading>
  );
};

export { Name };

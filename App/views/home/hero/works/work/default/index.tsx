import React from 'react';

import classNames from 'classnames';

import { HyperLink, Layout } from 'design/components';

import { EXPERIMENTS } from '@/views/routes';

import { Name } from '@/views/home/hero/works/work/name';
import { Preview } from '@/views/home/hero/works/work/preview';
import { View } from '@/views/home/hero/works/work/view';

import type { Props } from '@/views/home/hero/works/work';

import './styles.scss';

import { CLASS_NAME as WORK } from '@/views/home/hero/works/work/constants';

const CLASS_NAME = `${WORK}--default`;

const Default: React.FunctionComponent<Props> = ({ plate }) => {
  const experiment = EXPERIMENTS.find((each) => {
    return each.plate === plate;
  });

  if (!experiment) {
    return null;
  }

  return (
    <Layout alignItems='center' fill={4} gap='wide'>
      <HyperLink
        className={classNames(CLASS_NAME, 'kicl-inline-size-full')}
        to={experiment.to}
        unstyled
      >
        <Name plate={plate} />
        <Preview plate={plate} />
        <View />
      </HyperLink>
    </Layout>
  );
};

export { Default };

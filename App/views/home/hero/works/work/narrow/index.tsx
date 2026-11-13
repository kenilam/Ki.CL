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

const CLASS_NAME = `${WORK}--narrow`;

const Narrow: React.FunctionComponent<Props> = ({ plate }) => {
  const experiment = EXPERIMENTS.find((each) => {
    return each.plate === plate;
  });

  if (!experiment) {
    return null;
  }

  return (
    <Layout autoFlow='row' gap='narrow'>
      <HyperLink
        className={classNames(CLASS_NAME, 'kicl-inline-size-full')}
        to={experiment.to}
        unstyled
      >
        <Preview plate={plate} />
        <Layout
          alignItems='center'
          autoFlow='column'
          frames='1fr--max-content'
          gap='normal'
        >
          <div>
            <Name plate={plate} />
            <View />
          </div>
        </Layout>
      </HyperLink>
    </Layout>
  );
};

export { Narrow };

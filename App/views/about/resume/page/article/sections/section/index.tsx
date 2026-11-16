import React from 'react';

import classNames from 'classnames';

import { Layout } from 'design/components';

import type { SectionId } from '@/views/about/resume/content';

import { useInverse } from '@/views/use-inverse';

import { Body } from './body';
import { Hint } from './hint';
import { Label } from './label';
import { Title } from './title';

import './styles.scss';

import { CLASS_NAME } from './constants';

type Props = { id: SectionId };

const Section: React.FunctionComponent<Props> = ({ id }) => {
  const inverse = useInverse();

  return (
    <Layout alignContent='start' autoFlow='row' gap='wide'>
      <section
        className={classNames(
          CLASS_NAME,
          inverse,
          'kicl-background-color-body',
          'kicl-inline-size-full',
          'kicl-min-block-size-screen',
          'kicl-overflow-x-clip',
          'kicl-padding-block-extreme',
          'kicl-padding-inline-frame-columns-12',
          'kicl-position-relative',
          'kicl-scroll-enter',
          'kicl-scroll-snap-align-start'
        )}
      >
        <Label id={id} />
        <Title id={id} />
        <Body id={id} />
        <Hint />
      </section>
    </Layout>
  );
};

export { Section, type Props };

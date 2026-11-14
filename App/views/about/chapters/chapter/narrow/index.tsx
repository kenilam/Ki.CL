import React from 'react';

import { Layout } from 'design/components';

import { Body } from '@/views/about/chapters/chapter/body';
import { Title } from '@/views/about/chapters/chapter/title';
import { Years } from '@/views/about/chapters/chapter/years';

import type { Props } from '@/views/about/chapters/chapter';

const Narrow: React.FunctionComponent<Props> = ({ id }) => {
  return (
    <Layout autoFlow='row' gap='narrow'>
      <article className='kicl-padding-inline-end-extreme'>
        <Years id={id} />
        <Title id={id} />
        <Body id={id} />
      </article>
    </Layout>
  );
};

export { Narrow };

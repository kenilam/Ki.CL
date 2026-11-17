import React from 'react';

import { Layout } from 'design/components';

import { Dates } from '@/views/resume/page/article/timeline/roles/role/dates';
import { Organisation } from '@/views/resume/page/article/timeline/roles/role/organisation';
import { Points } from '@/views/resume/page/article/timeline/roles/role/points';
import { Title } from '@/views/resume/page/article/timeline/roles/role/title';

import type { Props } from '@/views/resume/page/article/timeline/roles/role';

const Narrow: React.FunctionComponent<Props> = ({ id }) => {
  return (
    <Layout autoFlow='row' gap='narrow'>
      <article className='kicl-print-break-inside-avoid'>
        <Dates id={id} />
        <Organisation id={id} />
        <Title id={id} />
        <Points id={id} />
      </article>
    </Layout>
  );
};

export { Narrow };

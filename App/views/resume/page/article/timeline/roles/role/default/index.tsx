import React from 'react';

import { Layout } from 'design/components';

import { Dates } from '@/views/resume/page/article/timeline/roles/role/dates';
import { Organisation } from '@/views/resume/page/article/timeline/roles/role/organisation';
import { Points } from '@/views/resume/page/article/timeline/roles/role/points';
import { Title } from '@/views/resume/page/article/timeline/roles/role/title';

import type { Props } from '@/views/resume/page/article/timeline/roles/role';

const Default: React.FunctionComponent<Props> = ({ id }) => {
  return (
    <Layout alignItems='start' autoFlow='column' frames='3fr--9fr' gap='normal'>
      <article className='kicl-print-break-inside-avoid'>
        <Dates id={id} />
        <Layout autoFlow='row' gap='narrow'>
          <div className='kicl-max-inline-size-columns-5'>
            <Organisation id={id} />
            <Title id={id} />
            <Points id={id} />
          </div>
        </Layout>
      </article>
    </Layout>
  );
};

export { Default };

import React from 'react';

import classNames from 'classnames';

import { Layout } from 'design/components';

import { Dates } from '@/views/about/resume/page/article/timeline/roles/role/dates';
import { Organisation } from '@/views/about/resume/page/article/timeline/roles/role/organisation';
import { Points } from '@/views/about/resume/page/article/timeline/roles/role/points';
import { Title } from '@/views/about/resume/page/article/timeline/roles/role/title';

import type { Props } from '@/views/about/resume/page/article/timeline/roles/role';

const Narrow: React.FunctionComponent<Props> = ({ id }) => {
  return (
    <Layout autoFlow='row' gap='narrow'>
      <article
        className={classNames(
          'kicl-padding-inline-end-extreme',
          'kicl-print-break-inside-avoid'
        )}
      >
        <Dates id={id} />
        <Organisation id={id} />
        <Title id={id} />
        <Points id={id} />
      </article>
    </Layout>
  );
};

export { Narrow };

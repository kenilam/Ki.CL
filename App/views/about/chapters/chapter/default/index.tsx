import React from 'react';

import { Layout } from 'design/components';

import { Body } from '@/views/about/chapters/chapter/body';
import { Title } from '@/views/about/chapters/chapter/title';
import { Years } from '@/views/about/chapters/chapter/years';

import type { Props } from '@/views/about/chapters/chapter';

const Default: React.FunctionComponent<Props> = ({ id }) => {
  return (
    <Layout alignItems='start' autoFlow='column' frames='3fr--9fr' gap='normal'>
      <article>
        <Years id={id} />
        <Layout autoFlow='row' gap='narrow'>
          <div>
            <Title id={id} />
            <Body id={id} />
          </div>
        </Layout>
      </article>
    </Layout>
  );
};

export { Default };

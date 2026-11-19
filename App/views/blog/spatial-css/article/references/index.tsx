import React from 'react';

// Libraries
import classNames from 'classnames';

// Components
import { Layout } from 'design/components';

// Hooks
import { useSection } from '@/views/blog/spatial-css/use-section';

// Partials
import { Title } from '@/views/blog/spatial-css/article/title';
import { Links } from './links';

const References: React.FunctionComponent = () => {
  const ref = useSection<HTMLElement>('references');

  return (
    <Layout autoFlow='row' gap='normal'>
      <section
        className={classNames(
          'kicl-max-inline-size-columns-6',
          'kicl-padding-block-end-screen-quarter',
          'kicl-padding-block-start-wider'
        )}
        ref={ref}
      >
        <Title id='references' />
        <Links />
      </section>
    </Layout>
  );
};

export { References };

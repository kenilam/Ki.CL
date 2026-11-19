import React from 'react';

// Libraries
import classNames from 'classnames';

// Components
import { Layout, List } from 'design/components';

// Hooks
import { useSection } from '@/views/blog/spatial-css/use-section';

// Partials
import { Title } from '@/views/blog/spatial-css/article/title';
import { Limit } from './limit';

// Constants
import { LIMITS } from './constants';

const Limits: React.FunctionComponent = () => {
  const ref = useSection<HTMLElement>('limits');

  return (
    <Layout autoFlow='row' gap='normal'>
      <section
        className={classNames(
          'kicl-max-inline-size-columns-6',
          'kicl-padding-block-wider'
        )}
        ref={ref}
      >
        <Title id='limits' />
        <List
          className='kicl-scroll-reveal'
          gap='narrower'
          listStyleType='disc'
        >
          {LIMITS.map((limit) => {
            return <Limit limit={limit} key={limit} />;
          })}
        </List>
      </section>
    </Layout>
  );
};

export { Limits };

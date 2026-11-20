import React from 'react';

// Libraries
import classNames from 'classnames';

// Components
import { Frame, Layout } from 'design/components';

// Partials
import { Back } from '@/views/experiments/swatch/back';
import { Maker } from '@/views/experiments/swatch/maker';
import { Open } from '@/views/experiments/swatch/open';

// Constants
import { CLASS_NAME as HOME } from '@/views/experiments/swatch/home/constants';

const Empty: React.FunctionComponent = () => {
  return (
    <>
      <Frame>
        <Layout
          alignItems='center'
          autoFlow='column'
          display='flex'
          gap='normal'
        >
          <article
            className={classNames(
              `${HOME}__empty`,
              'kicl--theme--dark',
              'kicl-position-relative'
            )}
          >
            <Back />
            <Open className='kicl-margin-block-auto' />
          </article>
        </Layout>
      </Frame>
      <Maker defaultOpen />
    </>
  );
};

export { Empty };

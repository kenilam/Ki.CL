import React from 'react';

// Libraries
import classNames from 'classnames';

// Components
import { Layout } from 'design/components';

// Partials
import { Allowance } from '@/views/experiments/image-agent/allowance';
import { Composer } from '@/views/experiments/image-agent/composer';

// Styles
import './styles.scss';

// Constants
import { CLASS_NAME as CHAT } from '@/views/experiments/image-agent/chat/constants';

const CLASS_NAME = `${CHAT}__reply`;

/** Pinned to the bottom of the window, over a backdrop, with a line on top. */
const Reply: React.FunctionComponent = () => {
  return (
    <Layout autoFlow='row' gap='narrow' justifyItems='start'>
      <section
        className={classNames(
          CLASS_NAME,
          'kicl-inline-size-columns-8',
          // While it is stuck, a line of the moving gradient runs along the top.
          'kicl-stuck-line-start',
          'kicl-inset-block-end-0',
          'kicl-position-sticky',
          'kicl-padding-block-start',
          'kicl-padding-block-end-wide',
          'kicl-padding-inline-frame',
          'kicl-margin-inline-auto'
        )}
      >
        <Allowance />
        <Composer />
      </section>
    </Layout>
  );
};

export { Reply };

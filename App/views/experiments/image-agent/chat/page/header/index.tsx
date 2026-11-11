import React from 'react';

// Libraries
import classNames from 'classnames';

// Components
import { BackLink, Layout } from 'design/components';

// Constants
import { toPath } from '@/views/experiments/image-agent/constants';
import { CLASS_NAME as CHAT } from '@/views/experiments/image-agent/chat/constants';

const CLASS_NAME = `${CHAT}__header`;

/** Stuck to the top of the conversation: the way back to the start page. */
const Header: React.FunctionComponent = () => {
  return (
    <Layout autoFlow='row' gap='narrow'>
      <header
        className={classNames(
          CLASS_NAME,
          'kicl-backdrop',
          'kicl-border-radius-md',
          'kicl-inset-block-start',
          'kicl-position-sticky',
          'kicl-padding-block-narrow',
          'kicl-padding-inline-narrow',
          'kicl-z-index-floating'
        )}
      >
        <BackLink to={toPath()} />
      </header>
    </Layout>
  );
};

export { Header };

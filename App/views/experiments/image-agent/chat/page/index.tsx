import React from 'react';

// Libraries
import classNames from 'classnames';

// Components
import { Layout } from 'design/components';

// Partials
import { Conversation } from './conversation';
import { Header } from './header';

// Constants
import { CLASS_NAME } from '@/views/experiments/image-agent/chat/constants';

/**
 * Header, then the conversation, which grows to fill the window so the
 * composer after it starts at the bottom.
 */
const Page: React.FunctionComponent = () => {
  return (
    <Layout
      autoFlow='row'
      gap='none'
      justifyContent='stretch'
      frames='max-content--1fr'
    >
      <article
        className={classNames(
          CLASS_NAME,
          'kicl-inline-size-columns-8',
          'kicl-margin-inline-auto',
          'kicl-min-block-size-screen',
          'kicl-padding-block-start-header',
          'kicl-padding-inline-frame'
        )}
      >
        <Header />
        <Conversation />
      </article>
    </Layout>
  );
};

export { Page };

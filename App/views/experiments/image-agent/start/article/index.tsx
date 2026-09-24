import React from 'react';

// Libraries
import classNames from 'classnames';

// Components
import { Heading, Layout } from '@/components';

// Partials
import { Asking } from './asking';
import { Drawing } from './drawing';
import { Failover } from './failover';
import { Governing } from './governing';
import { Limits } from './limits';
import { Retrieval } from './retrieval';
import { SendingAMessage } from './sending-a-message';
import { WhatThisIs } from './what-this-is';

// Constants
import { ARTICLE_ID } from '@/views/experiments/image-agent/start/constants';

/** How it was made, under the start page, as on the Music Visualiser. */
const Article: React.FunctionComponent = () => (
  <Layout autoFlow='row' gap='wide' justifyItems='stretch'>
    <div
      className={classNames(
        'kicl-inline-size-columns-12',
        'kicl-margin-inline-auto',
        'kicl-padding-block-end-extreme',
        'kicl-padding-block-start-extreme',
        'kicl-padding-inline-frame'
      )}
      id={ARTICLE_ID}
    >
      <Heading className='kicl-font-size-larger'>How it was made</Heading>
      <WhatThisIs />
      <SendingAMessage />
      <Governing />
      <Asking />
      <Retrieval />
      <Drawing />
      <Failover />
      <Limits />
    </div>
  </Layout>
);

export { Article };

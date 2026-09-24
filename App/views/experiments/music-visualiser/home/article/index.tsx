import React from 'react';

// Libraries
import classNames from 'classnames';

// Components
import { Layout } from '@/components';

// Partials
import { Address } from './address';
import { Data } from './data';
import { Music } from './music';
import { Picture } from './picture';
import { WhatThisIs } from './what-this-is';

// Styles
import './styles.scss';

// Constants
import {
  ARTICLE_ID,
  CLASS_NAME as HOME,
} from '@/views/experiments/music-visualiser/home/constants';

const CLASS_NAME = `${HOME}__article`;

/** How it was made: the music, the picture, the data, and the address. */
const Article: React.FunctionComponent = () => (
  <Layout autoFlow='row' gap='wide' justifyItems='stretch'>
    <div
      className={classNames(
        CLASS_NAME,
        'kicl-margin-inline-auto',
        'kicl-padding-block-start-extreme',
        'kicl-position-relative'
      )}
      id={ARTICLE_ID}
    >
      <WhatThisIs />
      <Music />
      <Picture />
      <Data />
      <Address />
    </div>
  </Layout>
);

export { Article };

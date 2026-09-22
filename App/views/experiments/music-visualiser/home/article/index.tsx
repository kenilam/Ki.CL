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
  <Layout autoFlow='row' gap='wider' justifyItems='stretch'>
    <article className={classNames(CLASS_NAME, 'kicl-position-relative')}>
      {/*
       * The banner's chevron links here. HyperLink centres a hash target, so
       * the target sits half a screen down: centring it brings the article's
       * top to the top of the screen.
       */}
      <span
        aria-hidden
        className={classNames(
          `${CLASS_NAME}__anchor`,
          'kicl-position-absolute'
        )}
        id={ARTICLE_ID}
      />
      <WhatThisIs />
      <Music />
      <Picture />
      <Data />
      <Address />
    </article>
  </Layout>
);

export { Article };

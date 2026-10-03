import React, { useId } from 'react';

// Libraries
import classNames from 'classnames';

// Components
import { Heading, Layout } from 'design/components';

// Partials
import { Address } from './address';
import { Data } from './data';
import { Music } from './music';
import { Picture } from './picture';
import { WhatThisIs } from './what-this-is';

// Constants
import {
  ARTICLE_ID,
  COPY,
  CLASS_NAME as HOME,
} from '@/views/experiments/music-visualiser/home/constants';

const CLASS_NAME = `${HOME}__article`;

/**
 * How it was made: the music, the picture, the data, and the address. The
 * heading is for screen readers; on screen the banner's chevron names it.
 */
const Article: React.FunctionComponent = () => {
  const id = useId();

  return (
    <Layout autoFlow='row' gap='wide' justifyItems='stretch'>
      <section
        aria-labelledby={id}
        className={classNames(
          CLASS_NAME,
          'kicl-margin-inline-auto',
          'kicl-max-inline-size-columns-12',
          'kicl-padding-block-start-extreme',
          'kicl-padding-inline-frame',
          'kicl-position-relative'
        )}
        id={ARTICLE_ID}
      >
        <Heading className='kicl-hidden' id={id} is='h2'>
          {COPY.article}
        </Heading>
        <WhatThisIs />
        <Music />
        <Picture />
        <Data />
        <Address />
      </section>
    </Layout>
  );
};

export { Article };

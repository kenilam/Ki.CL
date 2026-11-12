import React, { useId } from 'react';

// Libraries
import classNames from 'classnames';

// Components
import { Heading, Layout } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

// Partials
import { Address } from './address';
import { Data } from './data';
import { Music } from './music';
import { Picture } from './picture';
import { WhatThisIs } from './what-this-is';

// Constants
import { ARTICLE_ID } from '@/views/experiments/music-visualiser/home/constants';

/** How it was made: the music, the picture, the data, and the address. */
const Article: React.FunctionComponent = () => {
  const { t } = useTranslation();
  const id = useId();

  return (
    <Layout autoFlow='row' gap='wide' justifyItems='stretch'>
      <section
        aria-labelledby={id}
        className={classNames(
          'kicl-inline-size-columns-12',
          'kicl-margin-inline-auto',
          'kicl-padding-block-frame',
          'kicl-padding-inline-frame'
        )}
        id={ARTICLE_ID}
      >
        <Heading className='kicl-font-size-larger' id={id} is='h2'>
          {t('title', { context: 'how_it_was_made' })}
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

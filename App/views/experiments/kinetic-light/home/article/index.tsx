import React, { useId } from 'react';

// Libraries
import classNames from 'classnames';

// Components
import { Heading, Layout } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

// Partials
import { Keeping } from './keeping';
import { Picture } from './picture';
import { Reading } from './reading';
import { Sound } from './sound';
import { Tracking } from './tracking';
import { WhatThisIs } from './what-this-is';

// Constants
import { ARTICLE_ID } from '@/views/experiments/kinetic-light/home/constants';

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
        <Reading />
        <Picture />
        <Sound />
        <Keeping />
        <Tracking />
      </section>
    </Layout>
  );
};

export { Article };

import React, { useId } from 'react';

// Libraries
import classNames from 'classnames';

// Components
import { Heading, Layout } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

// Partials
import { DrawingOrganisms } from './drawing-organisms';
import { FifteenAttempts } from './fifteen-attempts';
import { Quota } from './quota';
import { TheBackend } from './the-backend';
import { ThePicture } from './the-picture';
import { TuningTheReviewer } from './tuning-the-reviewer';
import { WhatIGaveUp } from './what-i-gave-up';
import { WhereItStarted } from './where-it-started';

// Constants
import { ARTICLE_ID } from '@/views/experiments/tree-of-life/home/constants';

/**
 * How the experiment got to its current version, from the D3 reference to
 * what the latest view gave up.
 */
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
        <WhereItStarted />
        <ThePicture />
        <FifteenAttempts />
        <TheBackend />
        <DrawingOrganisms />
        <TuningTheReviewer />
        <Quota />
        <WhatIGaveUp />
      </section>
    </Layout>
  );
};

export { Article };

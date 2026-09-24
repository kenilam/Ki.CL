import React from 'react';

// Libraries
import classNames from 'classnames';

// Components
import { Layout } from '@/components';

// Constants
import { CLASS_NAME as HOME } from '@/views/experiments/tree-of-life/home/constants';

// Partials
import { DrawingOrganisms } from './drawing-organisms';
import { FifteenAttempts } from './fifteen-attempts';
import { Quota } from './quota';
import { TheBackend } from './the-backend';
import { ThePicture } from './the-picture';
import { TuningTheReviewer } from './tuning-the-reviewer';
import { WhatIGaveUp } from './what-i-gave-up';
import { WhereItStarted } from './where-it-started';

/**
 * How the experiment got to its current version, from the D3 reference to
 * what the latest view gave up. The banner is framed to the window; this
 * keeps to the page column.
 */
const Article: React.FunctionComponent = () => {
  return (
    <Layout
      justifyContent='start'
      justifyItems='start'
      alignItems='start'
      alignContent='start'
    >
      <div
        className={classNames(
          `${HOME}__column`,
          'kicl-margin-inline-auto',
          'kicl-max-inline-size-columns-12',
          'kicl-padding-block-start-extreme'
        )}
      >
        <WhereItStarted />
        <ThePicture />
        <FifteenAttempts />
        <TheBackend />
        <DrawingOrganisms />
        <TuningTheReviewer />
        <Quota />
        <WhatIGaveUp />
      </div>
    </Layout>
  );
};

export { Article };

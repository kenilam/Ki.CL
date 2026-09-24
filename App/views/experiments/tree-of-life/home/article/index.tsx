import React from 'react';

// Components
import { Layout } from '@/components';

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
 * what the latest view gave up.
 */

const Article: React.FunctionComponent = () => {
  return (
    <Layout
      justifyContent='start'
      justifyItems='start'
      alignItems='start'
      alignContent='start'
    >
      <div>
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

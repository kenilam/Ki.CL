import React from 'react';

// Libraries
import classNames from 'classnames';

// Components
import { Layout } from 'design/components';

// Partials
import { Build } from './article/build';
import { Cascade } from './article/cascade';
import { Configuration } from './article/configuration';
import { Failure } from './article/failure';
import { Header } from './article/header';
import { Limits } from './article/limits';
import { Load } from './article/load';
import { Origin } from './article/origin';
import { References } from './article/references';
import { Terminology } from './article/terminology';
import { Types } from './article/types';
import { Under } from './article/under';
import { Why } from './article/why';
import { Worth } from './article/worth';

// Constants
import { CLASS_NAME, TITLE_ID } from './constants';

const Contents: React.FunctionComponent = () => {
  return (
    <Layout gap='wider'>
      <article
        aria-labelledby={TITLE_ID}
        className={classNames(
          CLASS_NAME,
          'kicl-inline-size-full',
          'kicl-padding-block-extreme',
          'kicl-padding-inline-frame-columns-12'
        )}
      >
        <Header />
        <Why />
        <Terminology />
        <Configuration />
        <Build />
        <Load />
        <Under />
        <Origin />
        <Types />
        <Cascade />
        <Failure />
        <Worth />
        <Limits />
        <References />
      </article>
    </Layout>
  );
};

export { Contents };

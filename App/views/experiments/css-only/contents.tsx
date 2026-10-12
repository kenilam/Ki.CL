import React from 'react';

// Libraries
import classNames from 'classnames';

// Components
import { Layout } from 'design/components';

// Partials
import { Anchored } from './anchored';
import { Disclosure } from './disclosure';
import { Header } from './header';
import { Marker } from './marker';
import { Progress } from './progress';
import { Reveal } from './reveal';

// Constants
import { CLASS_NAME } from './constants';

/**
 * Behaviour a page usually scripts, each piece left to the stylesheet. Every
 * piece is a design system component; this view adds no CSS of its own.
 */
const CssOnly: React.FunctionComponent = () => (
  <Layout autoFlow='row' gap='none'>
    <article
      className={classNames(
        CLASS_NAME,
        'kicl-inline-size-full',
        'kicl-padding-block-end-extreme'
      )}
    >
      <Header />
      <Progress />
      <Anchored />
      <Marker />
      <Disclosure />
      <Reveal />
    </article>
  </Layout>
);

export { CssOnly };

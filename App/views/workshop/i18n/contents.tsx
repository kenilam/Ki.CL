import React from 'react';

// Libraries
import classNames from 'classnames';

// Components
import { Layout } from 'design/components';

// Partials
import { Availability } from './article/availability';
import { Header } from './article/header';
import { How } from './article/how';
import { Implementation } from './article/implementation';
import { Limits } from './article/limits';
import { Negotiation } from './article/negotiation';
import { Rtl } from './article/rtl';
import { Serving } from './article/serving';
import { Switcher } from './article/switcher';
import { Translating } from './article/translating';
import { Why } from './article/why';
import { Wrong } from './article/wrong';

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
        <Switcher />
        <Why />
        <How />
        <Negotiation />
        <Serving />
        <Translating />
        <Availability />
        <Rtl />
        <Implementation />
        <Wrong />
        <Limits />
      </article>
    </Layout>
  );
};

export { Contents };

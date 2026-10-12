import React, { useId } from 'react';

// Libraries
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

// Components
import { Heading, Layout, ScrollIndicator } from 'design/components';

// Partials
import { More } from './more';
import { Stage } from './stage';

// Styles
import './styles.scss';

// Constants
import { CLASS_NAME } from './constants';

/**
 * The experiments index: a pinned stage of full-screen panels, then a
 * closing section in normal flow.
 */
const Home: React.FunctionComponent = () => {
  const { t: common } = useTranslation();
  const titleId = useId();

  return (
    <Layout gap='none' justifyItems='stretch'>
      <section
        aria-labelledby={titleId}
        className={classNames(CLASS_NAME, 'kicl-inline-size-full')}
      >
        <Heading className='kicl-hidden' id={titleId}>
          {common('experiments')}
        </Heading>
        <ScrollIndicator />
        <Stage />
        <More />
      </section>
    </Layout>
  );
};

export { Home };

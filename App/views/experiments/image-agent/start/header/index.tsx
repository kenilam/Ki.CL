import React from 'react';

// Libraries
import classNames from 'classnames';

// Components
import { Heading, Layout } from '@/components';

// Styles
import './styles.scss';

// Constants
import { CLASS_NAME as START } from '@/views/experiments/image-agent/start/constants';

const CLASS_NAME = `${START}__header`;

const COPY = {
  title: 'Image Agent',
};

/** The page title on the start page. */
const Header: React.FunctionComponent = () => (
  <Layout autoFlow='row' gap='narrow'>
    <header
      className={classNames(
        CLASS_NAME,
        'kicl-backdrop',
        'kicl-border-radius-md',
        'kicl-z-index-floating'
      )}
    >
      <Heading
        is='h1'
        dense
        className={classNames(`${CLASS_NAME}__title`, 'kicl-font-size-huge')}
      >
        {COPY.title}
      </Heading>
    </header>
  </Layout>
);

export { Header };

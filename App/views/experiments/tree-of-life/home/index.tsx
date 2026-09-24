import React from 'react';

// Libraries
import classNames from 'classnames';

// Components
import { Layout } from '@/components';

// Partials
import { Article } from './article';
import { Banner } from './banner';

// Styles
import './styles.scss';

// Constants
import { CLASS_NAME } from './constants';

const Home: React.FunctionComponent = () => {
  return (
    <Layout gap='wide'>
      <article
        className={classNames(CLASS_NAME, 'kicl-padding-block-end-extreme')}
      >
        <Banner />
        <Article />
      </article>
    </Layout>
  );
};

export { Home };

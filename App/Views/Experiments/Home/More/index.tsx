import React from 'react';

// Libraries
import classNames from 'classnames';

// Components
import { Heading, HyperLink, Layout } from '@/Components';

// Styles
import './Styles.scss';

// Constants
import { PATH as EXPERIMENTS } from '@/Views/Experiments/constants';
import { CLASS_NAME as HOME } from '@/Views/Experiments/Home/constants';

const CLASS_NAME = `${HOME}__more`;

const COPY = {
  bookmark: 'Bookmark this page',
  title: 'More to come',
};

/** The closing screen, in normal flow after the stage, content centred. One element: the grid is the footer. */
const More: React.FunctionComponent = () => (
  <Layout
    alignContent='center'
    autoFlow='row'
    gap='wider'
    justifyItems='start'
  >
    <footer className={CLASS_NAME}>
      <Heading is='h2' dense className={classNames('kicl-font-size-huge', 'kicl-line-height-narrower')}>
        {COPY.title}
      </Heading>
      <HyperLink
        className='kicl-margin-block-start-narrow'
        lookLikeButton
        to={`/${EXPERIMENTS}`}
      >
        {COPY.bookmark}
      </HyperLink>
    </footer>
  </Layout>
);

export { CLASS_NAME };
export default More;

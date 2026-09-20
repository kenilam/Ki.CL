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

/** The closing screen, in normal flow after the stage, content centred. */
const More: React.FunctionComponent = () => (
  <Layout alignContent='center' autoFlow='row' gap='narrow'>
    <footer className={classNames(CLASS_NAME, `${CLASS_NAME}__body`, `${CLASS_NAME}__words`)}>
      <Heading
        is='h2'
        dense
        className={classNames(
          `${CLASS_NAME}__title`,
          'kicl-text-transform-uppercase'
        )}
      >
        {COPY.title}
      </Heading>
      <HyperLink
        className={`${CLASS_NAME}__link`}
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

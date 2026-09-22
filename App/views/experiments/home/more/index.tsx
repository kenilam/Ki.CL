import React from 'react';

// Libraries
import classNames from 'classnames';

// Components
import { Heading, Layout, Text } from '@/components';

// Styles
import './styles.scss';

// Constants
import { CLASS_NAME as HOME } from '@/views/experiments/home/constants';

// Partials
import { Bookmark } from './bookmark';
import { Share } from './share';

const CLASS_NAME = `${HOME}__more`;

const COPY = {
  message: 'More on the making',
  title: 'Come back soon.',
};

/** The closing screen, in normal flow after the stage, content centred. One element: the grid is the footer. */
const More: React.FunctionComponent = () => (
  <Layout
    alignContent='center'
    autoFlow='row'
    gap='narrow'
    justifyItems='start'
  >
    <footer className={CLASS_NAME}>
      <Heading
        is='h2'
        dense
        className={classNames(
          'kicl-font-size-huge',
          'kicl-line-height-narrower'
        )}
      >
        {COPY.title}
      </Heading>
      <Text>{COPY.message}</Text>
      <Layout
        alignContent='center'
        alignItems='center'
        autoFlow='column'
        gap='narrow'
        justifyItems='center'
        justifyContent='center'
      >
        <aside>
          <Bookmark />
          <Share />
        </aside>
      </Layout>
    </footer>
  </Layout>
);

export { CLASS_NAME, More };

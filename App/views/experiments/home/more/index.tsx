import React, { useId } from 'react';

// Libraries
import classNames from 'classnames';

// Components
import { Heading, Layout, Text } from '@/components';

// Styles
import './styles.scss';

// Constants
import { CLASS_NAME as HOME } from '@/views/experiments/home/constants';

// Partials
import { Actions } from './actions';

const CLASS_NAME = `${HOME}__more`;

const COPY = {
  message: 'More on the making',
  title: 'Come back soon.',
};

/** The closing screen, in normal flow after the stage, content centred. One element: the grid is the section. */
const More: React.FunctionComponent = () => {
  const titleId = useId();

  return (
    <Layout
      alignContent='center'
      autoFlow='row'
      gap='narrow'
      justifyItems='start'
    >
      <section
        aria-labelledby={titleId}
        className={classNames(
          CLASS_NAME,
          'kicl-animation-none-reduced-motion',
          'kicl-padding-block-extreme',
          'kicl-padding-inline-frame'
        )}
      >
        <Heading
          is='h2'
          dense
          className={classNames(
            'kicl-font-size-huge',
            'kicl-line-height-narrower'
          )}
          id={titleId}
        >
          {COPY.title}
        </Heading>
        <Text>{COPY.message}</Text>
        <Actions />
      </section>
    </Layout>
  );
};

export { CLASS_NAME, More };

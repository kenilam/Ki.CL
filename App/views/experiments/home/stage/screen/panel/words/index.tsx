import React from 'react';

// Libraries
import classNames from 'classnames';

// Components
import { Layout } from 'design/components';

// Partials
import { Description } from './description';
import { Numbering } from './numbering';
import { Open } from './open';
import { Title } from './title';

// Styles
import './styles.scss';

// Constants
import { CLASS_NAME as SCREEN } from '@/views/experiments/home/stage/screen/constants';

const CLASS_NAME = `${SCREEN}__words`;

/** The text block. The only part of the panel that takes the pointer. */
const Words: React.FunctionComponent = () => {
  return (
    <Layout autoFlow='row' gap='narrow' justifyItems='start'>
      <article
        className={classNames(
          CLASS_NAME,
          'kicl-animation-none-reduced-motion',
          'kicl-padding-block-extreme',
          'kicl-padding-inline-frame-columns-12',
          'kicl-pointer-events-auto',
          'kicl-position-relative',
          'kicl-z-index-raised'
        )}
      >
        <Numbering />
        <Title />
        <Description />
        <Open />
      </article>
    </Layout>
  );
};

export { Words };

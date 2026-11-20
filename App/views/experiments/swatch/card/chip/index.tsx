import React from 'react';

// Libraries
import classNames from 'classnames';

// Components
import { Card, Layout } from 'design/components';

// Partials
import { Controls } from './controls';
import { Credit } from './credit';
import { Name } from './name';
import { Status } from './status';
import { Values } from './values';
import { Window } from './window';

// Styles
import './styles.scss';

// Constants
import { DRIFT } from '@/views/experiments/swatch/card/constants';
import { CLASS_NAME as VIEW } from '@/views/experiments/swatch/constants';

const CLASS_NAME = `${VIEW}__chip`;

const Chip: React.FunctionComponent = () => {
  return (
    <Card
      className={classNames(
        CLASS_NAME,
        DRIFT,
        'kicl--theme--light',
        'kicl-position-relative'
      )}
      gap='narrow'
      is='section'
      size={3}
    >
      <header className='kicl-position-relative'>
        <Name />
        <Status />
      </header>
      <Window />
      <Layout
        alignItems='end'
        autoFlow='column'
        frames='1fr--max-content'
        gap='narrow'
      >
        <footer>
          <Values />
          <Controls />
        </footer>
      </Layout>
      <Credit />
    </Card>
  );
};

export { Chip };

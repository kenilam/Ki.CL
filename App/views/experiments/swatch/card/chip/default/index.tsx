import React from 'react';

// Libraries
import classNames from 'classnames';

// Components
import { Card, Layout } from 'design/components';

// Partials
import { Controls } from '@/views/experiments/swatch/card/chip/controls';
import { Credit } from '@/views/experiments/swatch/card/chip/credit';
import { Name } from '@/views/experiments/swatch/card/chip/name';
import { Status } from '@/views/experiments/swatch/card/chip/status';
import { Values } from '@/views/experiments/swatch/card/chip/values';
import { Window } from '@/views/experiments/swatch/card/chip/window';

// Constants
import { DRIFT } from '@/views/experiments/swatch/card/constants';
import { CLASS_NAME } from '@/views/experiments/swatch/card/chip/constants';

const Default: React.FunctionComponent = () => {
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

export { Default };
